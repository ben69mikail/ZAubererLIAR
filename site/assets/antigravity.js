/* Antigravity – Partikel-Ring im Hintergrund (Vanilla-Three.js-Port).
   Reagiert auf Maus/Touch, idle-Auto-Animation. Nur Startseite.
   Respektiert prefers-reduced-motion und pausiert bei inaktivem Tab. */
(function () {
  if (!window.THREE) return;
  var canvas = document.getElementById('antigravity');
  if (!canvas) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  var P = {
    count: 300, magnetRadius: 6, ringRadius: 7, waveSpeed: 0.4, waveAmplitude: 1,
    particleSize: 1.5, lerpSpeed: 0.05, color: 0xffffff, autoAnimate: true,
    particleVariance: 1, rotationSpeed: 0, depthFactor: 1, pulseSpeed: 3, fieldStrength: 10
  };
  if (window.innerWidth < 768) P.count = 150; // Mobile: weniger Partikel

  var FOV = 35, CAMZ = 50;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = CAMZ;

  function vp() {
    var h = 2 * Math.tan(THREE.MathUtils.degToRad(FOV) / 2) * CAMZ;
    return { w: h * (window.innerWidth / window.innerHeight), h: h };
  }

  var geo = new THREE.SphereGeometry(0.2, 16, 16);
  var mat = new THREE.MeshBasicMaterial({ color: P.color, transparent: true, opacity: 0.35 });
  var mesh = new THREE.InstancedMesh(geo, mat, P.count);
  mesh.frustumCulled = false;
  scene.add(mesh);
  var dummy = new THREE.Object3D();

  var particles = [];
  function initParticles() {
    var v = vp(); particles.length = 0;
    for (var i = 0; i < P.count; i++) {
      var x = (Math.random() - 0.5) * v.w;
      var y = (Math.random() - 0.5) * v.h;
      var z = (Math.random() - 0.5) * 20;
      particles.push({
        t: Math.random() * 100, speed: 0.01 + Math.random() / 200,
        mx: x, my: y, mz: z, cx: x, cy: y, cz: z,
        randomRadiusOffset: (Math.random() - 0.5) * 2
      });
    }
  }
  initParticles();

  var ndc = { x: 0, y: 0 }, lastMouse = { x: 0, y: 0 }, lastMoveTime = 0, vmouse = { x: 0, y: 0 };
  function setNdc(cx, cy) {
    ndc.x = (cx / window.innerWidth) * 2 - 1;
    ndc.y = -((cy / window.innerHeight) * 2 - 1);
  }
  window.addEventListener('mousemove', function (e) { setNdc(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('touchmove', function (e) { if (e.touches[0]) setNdc(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });

  var start = performance.now();
  function frame() {
    var v = vp();
    var elapsed = (performance.now() - start) / 1000;
    var m = ndc;
    var md = Math.sqrt(Math.pow(m.x - lastMouse.x, 2) + Math.pow(m.y - lastMouse.y, 2));
    if (md > 0.001) { lastMoveTime = performance.now(); lastMouse.x = m.x; lastMouse.y = m.y; }

    var destX = (m.x * v.w) / 2, destY = (m.y * v.h) / 2;
    if (P.autoAnimate && performance.now() - lastMoveTime > 2000) {
      destX = Math.sin(elapsed * 0.5) * (v.w / 4);
      destY = Math.cos(elapsed * 0.5 * 2) * (v.h / 4);
    }
    vmouse.x += (destX - vmouse.x) * 0.05;
    vmouse.y += (destY - vmouse.y) * 0.05;
    var targetX = vmouse.x, targetY = vmouse.y;
    var globalRot = elapsed * P.rotationSpeed;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.t += p.speed / 2; var t = p.t;
      var projF = 1 - p.cz / 50;
      var ptx = targetX * projF, pty = targetY * projF;
      var dx = p.mx - ptx, dy = p.my - pty;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var tx = p.mx, ty = p.my, tz = p.mz * P.depthFactor;
      if (dist < P.magnetRadius) {
        var angle = Math.atan2(dy, dx) + globalRot;
        var wave = Math.sin(t * P.waveSpeed + angle) * (0.5 * P.waveAmplitude);
        var dev = p.randomRadiusOffset * (5 / (P.fieldStrength + 0.1));
        var rr = P.ringRadius + wave + dev;
        tx = ptx + rr * Math.cos(angle);
        ty = pty + rr * Math.sin(angle);
        tz = p.mz * P.depthFactor + Math.sin(t) * (P.waveAmplitude * P.depthFactor);
      }
      p.cx += (tx - p.cx) * P.lerpSpeed;
      p.cy += (ty - p.cy) * P.lerpSpeed;
      p.cz += (tz - p.cz) * P.lerpSpeed;

      dummy.position.set(p.cx, p.cy, p.cz);
      dummy.lookAt(ptx, pty, p.cz);
      dummy.rotateX(Math.PI / 2);

      var cdm = Math.sqrt(Math.pow(p.cx - ptx, 2) + Math.pow(p.cy - pty, 2));
      var scale = 1 - Math.abs(cdm - P.ringRadius) / 10;
      if (scale < 0) scale = 0; else if (scale > 1) scale = 1;
      var fs = scale * (0.8 + Math.sin(t * P.pulseSpeed) * 0.2 * P.particleVariance) * P.particleSize;
      dummy.scale.set(fs, fs, fs);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
  }

  var raf = null;
  function loop() { frame(); raf = requestAnimationFrame(loop); }

  window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    initParticles();
  }, { passive: true });

  if (reduce) { frame(); }
  else { loop(); }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
    else if (!reduce && !raf) { loop(); }
  });
})();
