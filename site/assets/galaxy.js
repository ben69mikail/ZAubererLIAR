/* Galaxy – Fullscreen-Sternenfeld-Shader (React-Bits-Port nach raw WebGL).
   Kein Framework/keine Lib nötig. Hintergrund-Canvas #galaxy.
   Maus-Repulsion, Twinkle, Auto-Rotation. prefers-reduced-motion: eingefroren.
   Layer-Opacity wird per CSS (#galaxy{opacity}) gesetzt. */
(function () {
  var canvas = document.getElementById('galaxy');
  if (!canvas) return;
  var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true });
  if (!gl) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  var P = {
    focal: [0.5, 0.5], rotation: [1.0, 0.0], starSpeed: 0.5, density: 0.9, hueShift: 140,
    speed: 1.0, glowIntensity: 0.3, saturation: 0.0, mouseRepulsion: 1, twinkleIntensity: 0.3,
    rotationSpeed: 0.08, repulsionStrength: 2, autoCenterRepulsion: 0, transparent: 1
  };

  var vert =
    'attribute vec2 uv;attribute vec2 position;varying vec2 vUv;' +
    'void main(){vUv=uv;gl_Position=vec4(position,0,1);}';

  var frag = [
'precision highp float;',
'uniform float uTime;uniform vec3 uResolution;uniform vec2 uFocal;uniform vec2 uRotation;',
'uniform float uStarSpeed;uniform float uDensity;uniform float uHueShift;uniform float uSpeed;',
'uniform vec2 uMouse;uniform float uGlowIntensity;uniform float uSaturation;uniform bool uMouseRepulsion;',
'uniform float uTwinkleIntensity;uniform float uRotationSpeed;uniform float uRepulsionStrength;',
'uniform float uMouseActiveFactor;uniform float uAutoCenterRepulsion;uniform bool uTransparent;',
'varying vec2 vUv;',
'#define NUM_LAYER 4.0',
'#define STAR_COLOR_CUTOFF 0.2',
'#define MAT45 mat2(0.7071,-0.7071,0.7071,0.7071)',
'#define PERIOD 3.0',
'float Hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
'float tri(float x){return abs(fract(x)*2.0-1.0);}',
'float tris(float x){float t=fract(x);return 1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0));}',
'float trisn(float x){float t=fract(x);return 2.0*(1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0)))-1.0;}',
'vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}',
'float Star(vec2 uv,float flare){float d=length(uv);float m=(0.05*uGlowIntensity)/d;',
'float rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));m+=rays*flare*uGlowIntensity;uv*=MAT45;',
'rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));m+=rays*0.3*flare*uGlowIntensity;m*=smoothstep(1.0,0.2,d);return m;}',
'vec3 StarLayer(vec2 uv){vec3 col=vec3(0.0);vec2 gv=fract(uv)-0.5;vec2 id=floor(uv);',
'for(int y=-1;y<=1;y++){for(int x=-1;x<=1;x++){vec2 offset=vec2(float(x),float(y));',
'vec2 si=id+vec2(float(x),float(y));float seed=Hash21(si);float size=fract(seed*345.32);',
'float glossLocal=tri(uStarSpeed/(PERIOD*seed+1.0));float flareSize=smoothstep(0.9,1.0,size)*glossLocal;',
'float red=smoothstep(STAR_COLOR_CUTOFF,1.0,Hash21(si+1.0))+STAR_COLOR_CUTOFF;',
'float blu=smoothstep(STAR_COLOR_CUTOFF,1.0,Hash21(si+3.0))+STAR_COLOR_CUTOFF;',
'float grn=min(red,blu)*seed;vec3 base=vec3(red,grn,blu);',
'float hue=atan(base.g-base.r,base.b-base.r)/(2.0*3.14159)+0.5;hue=fract(hue+uHueShift/360.0);',
'float sat=length(base-vec3(dot(base,vec3(0.299,0.587,0.114))))*uSaturation;',
'float val=max(max(base.r,base.g),base.b);base=hsv2rgb(vec3(hue,sat,val));',
'vec2 pad=vec2(tris(seed*34.0+uTime*uSpeed/10.0),tris(seed*38.0+uTime*uSpeed/30.0))-0.5;',
'float star=Star(gv-offset-pad,flareSize);vec3 color=base;',
'float twinkle=trisn(uTime*uSpeed+seed*6.2831)*0.5+1.0;twinkle=mix(1.0,twinkle,uTwinkleIntensity);star*=twinkle;',
'col+=star*size*color;}}return col;}',
'void main(){vec2 focalPx=uFocal*uResolution.xy;vec2 uv=(vUv*uResolution.xy-focalPx)/uResolution.y;',
'vec2 mouseNorm=uMouse-vec2(0.5);',
'if(uAutoCenterRepulsion>0.0){vec2 centerUV=vec2(0.0,0.0);float centerDist=length(uv-centerUV);',
'vec2 repulsion=normalize(uv-centerUV)*(uAutoCenterRepulsion/(centerDist+0.1));uv+=repulsion*0.05;}',
'else if(uMouseRepulsion){vec2 mousePosUV=(uMouse*uResolution.xy-focalPx)/uResolution.y;',
'float mouseDist=length(uv-mousePosUV);vec2 repulsion=normalize(uv-mousePosUV)*(uRepulsionStrength/(mouseDist+0.1));',
'uv+=repulsion*0.05*uMouseActiveFactor;}else{vec2 mouseOffset=mouseNorm*0.1*uMouseActiveFactor;uv+=mouseOffset;}',
'float autoRotAngle=uTime*uRotationSpeed;mat2 autoRot=mat2(cos(autoRotAngle),-sin(autoRotAngle),sin(autoRotAngle),cos(autoRotAngle));uv=autoRot*uv;',
'uv=mat2(uRotation.x,-uRotation.y,uRotation.y,uRotation.x)*uv;',
'vec3 col=vec3(0.0);',
'for(float i=0.0;i<1.0;i+=1.0/NUM_LAYER){float depth=fract(i+uStarSpeed*uSpeed);',
'float scale=mix(20.0*uDensity,0.5*uDensity,depth);float fade=depth*smoothstep(1.0,0.9,depth);',
'col+=StarLayer(uv*scale+i*453.32)*fade;}',
'if(uTransparent){float alpha=length(col);alpha=smoothstep(0.0,0.3,alpha);alpha=min(alpha,1.0);gl_FragColor=vec4(col,alpha);}',
'else{gl_FragColor=vec4(col,1.0);}}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn('galaxy shader', gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  var vs = compile(gl.VERTEX_SHADER, vert), fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return;
  var prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn('galaxy link', gl.getProgramInfoLog(prog)); return; }
  gl.useProgram(prog);

  // Fullscreen-Triangle
  var posLoc = gl.getAttribLocation(prog, 'position'), uvLoc = gl.getAttribLocation(prog, 'uv');
  var pb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, pb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
  var ub = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, ub);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 2, 0, 0, 2]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(uvLoc); gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

  function U(n) { return gl.getUniformLocation(prog, n); }
  var uTime = U('uTime'), uRes = U('uResolution'), uStarSpeed = U('uStarSpeed'),
      uMouse = U('uMouse'), uMouseActive = U('uMouseActiveFactor');
  // statische Uniforms
  gl.uniform2f(U('uFocal'), P.focal[0], P.focal[1]);
  gl.uniform2f(U('uRotation'), P.rotation[0], P.rotation[1]);
  gl.uniform1f(U('uDensity'), P.density);
  gl.uniform1f(U('uHueShift'), P.hueShift);
  gl.uniform1f(U('uSpeed'), P.speed);
  gl.uniform1f(U('uGlowIntensity'), P.glowIntensity);
  gl.uniform1f(U('uSaturation'), P.saturation);
  gl.uniform1f(U('uTwinkleIntensity'), P.twinkleIntensity);
  gl.uniform1f(U('uRotationSpeed'), P.rotationSpeed);
  gl.uniform1f(U('uRepulsionStrength'), P.repulsionStrength);
  gl.uniform1f(U('uAutoCenterRepulsion'), P.autoCenterRepulsion);
  gl.uniform1i(U('uMouseRepulsion'), P.mouseRepulsion);
  gl.uniform1i(U('uTransparent'), P.transparent);

  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); gl.clearColor(0, 0, 0, 0);

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = Math.floor(window.innerWidth * dpr), h = Math.floor(window.innerHeight * dpr);
    canvas.width = w; canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform3f(uRes, w, h, w / h);
  }
  window.addEventListener('resize', resize, { passive: true }); resize();

  var tgt = { x: 0.5, y: 0.5 }, sm = { x: 0.5, y: 0.5 }, tgtA = 0, smA = 0;
  function move(cx, cy) { tgt.x = cx / window.innerWidth; tgt.y = 1 - cy / window.innerHeight; tgtA = 1; }
  window.addEventListener('mousemove', function (e) { move(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('touchmove', function (e) { if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });

  var start = performance.now();
  function frame() {
    var t = (performance.now() - start) * 0.001;
    if (!reduce) { gl.uniform1f(uTime, t); gl.uniform1f(uStarSpeed, (t * P.starSpeed) / 10.0); }
    sm.x += (tgt.x - sm.x) * 0.05; sm.y += (tgt.y - sm.y) * 0.05; smA += (tgtA - smA) * 0.05;
    gl.uniform2f(uMouse, sm.x, sm.y); gl.uniform1f(uMouseActive, smA);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  var raf = null;
  function loop() { frame(); raf = requestAnimationFrame(loop); }
  if (reduce) { gl.uniform1f(uTime, 8.0); gl.uniform1f(uStarSpeed, 0.4); frame(); }
  else loop();

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
    else if (!reduce && !raf) loop();
  });
})();
