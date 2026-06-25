// === Zauberer LIAR – shared interactions (Design v3 „Nuit Magique") ===

document.documentElement.classList.add('js-anim');

// --- Sternenhimmel erzeugen ---
(function stars(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const host = document.getElementById('stars');
  if (!host) return;
  const N = Math.min(140, Math.round(innerWidth * innerHeight / 14000));
  const frag = document.createDocumentFragment();
  for (let i = 0; i < N; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    if (Math.random() < 0.18) s.classList.add('c' + (1 + Math.floor(Math.random() * 4)));
    const sz = Math.random() < 0.85 ? (1 + Math.random() * 1.6) : (2.2 + Math.random() * 1.8);
    s.style.width = s.style.height = sz.toFixed(1) + 'px';
    s.style.left = (Math.random() * 100).toFixed(2) + '%';
    s.style.top = (Math.random() * 100).toFixed(2) + '%';
    s.style.setProperty('--dur', (3 + Math.random() * 5).toFixed(1) + 's');
    s.style.setProperty('--dl', (Math.random() * 6).toFixed(1) + 's');
    s.style.setProperty('--mx', (0.4 + Math.random() * 0.6).toFixed(2));
    frag.appendChild(s);
  }
  host.appendChild(frag);
  // gelegentliche Sternschnuppe
  function shoot(){
    const sh = document.createElement('div');
    sh.className = 'shoot';
    const x = 10 + Math.random() * 70, y = Math.random() * 30;
    sh.style.left = x + 'vw'; sh.style.top = y + 'vh';
    document.body.appendChild(sh);
    sh.animate([
      { transform: 'translate(0,0) scaleX(1)', opacity: 0 },
      { opacity: 1, offset: .15 },
      { transform: 'translate(220px,180px) scaleX(14)', opacity: 0 }
    ], { duration: 900, easing: 'ease-out' }).onfinish = () => sh.remove();
    setTimeout(shoot, 6000 + Math.random() * 9000);
  }
  setTimeout(shoot, 3500);
})();

// --- Topbar shrink ---
const tb = document.getElementById('topbar');
if (tb) addEventListener('scroll', () => tb.classList.toggle('scrolled', scrollY > 40));

// --- Reveal on scroll ---
const io = new IntersectionObserver((es) => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

// --- Zähler hochzählen (optional data-from = Startwert, damit nie "0 J." sichtbar) ---
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const cio = new IntersectionObserver((es) => es.forEach(e => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, target = +el.dataset.count, suf = el.dataset.suffix || '';
    const from = +el.dataset.from || 0;
    const dur = 1200, t0 = performance.now();
    el.textContent = from.toLocaleString('de-DE') + suf;
    (function tick(now){
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (target - from) * eased).toLocaleString('de-DE') + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }), { threshold: .5 });
  counters.forEach(c => cio.observe(c));
}

// --- FAQ ---
document.querySelectorAll('.faq-item').forEach(it =>
  it.addEventListener('click', () => it.classList.toggle('open')));

// --- Mobile nav ---
const burger = document.getElementById('burger');
const mnav = document.getElementById('mobile-nav');
if (burger && mnav) {
  burger.addEventListener('click', () => { mnav.classList.toggle('open'); document.body.style.overflow = mnav.classList.contains('open') ? 'hidden' : ''; });
  mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mnav.classList.remove('open'); document.body.style.overflow = ''; }));
}

// --- Galerie-Filter ---
const filterBtns = document.querySelectorAll('.gal-filter button');
function applyFilter(cat) {
  let btn = [...filterBtns].find(b => b.dataset.cat === cat);
  if (!btn) return false;
  filterBtns.forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.masonry .tile').forEach(t => {
    t.classList.toggle('hide', cat !== 'all' && t.dataset.cat !== cat);
  });
  return true;
}
if (filterBtns.length) {
  filterBtns.forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.cat)));
  // Submenü-Anker (#musical, #firmenfeier …) aktiviert direkt den passenden Filter
  const fromHash = () => {
    const h = location.hash.replace('#', '');
    if (h && applyFilter(h)) {
      const g = document.querySelector('.gal-filter');
      if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  fromHash();
  addEventListener('hashchange', fromHash);
}

// --- Lightbox ---
(function lightbox(){
  const tiles = [...document.querySelectorAll('.masonry .tile img, [data-lightbox]')];
  if (!tiles.length) return;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<div class="lb-close" aria-label="Schließen">&times;</div>'
    + '<div class="lb-nav lb-prev" aria-label="Zurück">&#8249;</div>'
    + '<div class="lb-nav lb-next" aria-label="Weiter">&#8250;</div>'
    + '<img alt="">';
  document.body.appendChild(lb);
  const img = lb.querySelector('img');
  let cur = 0;
  const srcs = tiles.map(t => t.dataset.full || t.src);
  const alts = tiles.map(t => t.alt || '');
  function show(i){ cur = (i + srcs.length) % srcs.length; img.src = srcs[cur]; img.alt = alts[cur]; }
  tiles.forEach((t, i) => t.addEventListener('click', () => { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }));
  function close(){ lb.classList.remove('open'); document.body.style.overflow = ''; }
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); show(cur - 1); });
  lb.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); show(cur + 1); });
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();

// --- Videogalerie: YouTube erst bei Klick laden (DSGVO, kein Request vorher) ---
document.querySelectorAll('.video-frame[data-yt]').forEach(f => f.addEventListener('click', () => {
  const id = f.dataset.yt;
  const ifr = document.createElement('iframe');
  ifr.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
  ifr.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
  ifr.allowFullscreen = true;
  ifr.title = f.getAttribute('aria-label') || 'Video';
  f.replaceWith(ifr);
}));

// === DSGVO Cookie Consent + Google Analytics (consent-gated) ===
const GA_ID = 'G-ERW1J6LF5D'; // GA4-Property "zauberer-liar.de", Stream 15062943714
const CONSENT_KEY = 'liar_consent_v1';

function loadAnalytics() {
  if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}
function setConsent(val) {
  try { localStorage.setItem(CONSENT_KEY, val); } catch (e) {}
  const c = document.getElementById('cookie');
  if (c) c.classList.remove('show');
  if (val === 'accepted') loadAnalytics();
}
(function initConsent() {
  const banner = document.getElementById('cookie');
  let stored = null;
  try { stored = localStorage.getItem(CONSENT_KEY); } catch (e) {}
  if (stored === 'accepted') { loadAnalytics(); return; }
  if (stored === 'declined') { return; }
  if (banner) setTimeout(() => banner.classList.add('show'), 900);
})();
window.__liarConsent = { accept: () => setConsent('accepted'), decline: () => setConsent('declined') };
