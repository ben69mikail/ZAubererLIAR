// === Zauberer LIAR – shared interactions ===

// Arm reveal animations only when JS runs (content stays visible otherwise)
document.documentElement.classList.add('js-anim');

// Topbar shrink on scroll
const tb = document.getElementById('topbar');
if (tb) addEventListener('scroll', () => tb.classList.toggle('scrolled', scrollY > 40));

// Reveal on scroll
const io = new IntersectionObserver((es) => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(it =>
  it.addEventListener('click', () => it.classList.toggle('open')));

// Mobile nav
const burger = document.getElementById('burger');
const mnav = document.getElementById('mobile-nav');
if (burger && mnav) {
  burger.addEventListener('click', () => mnav.classList.toggle('open'));
  mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mnav.classList.remove('open')));
}

// === DSGVO Cookie Consent + Google Analytics (consent-gated) ===
// GA4 lädt NUR nach ausdrücklicher Zustimmung (Opt-in).
const GA_ID = 'G-XXXXXXXXXX'; // TODO: echte GA4-Measurement-ID eintragen
const CONSENT_KEY = 'liar_consent_v1';

function loadAnalytics() {
  if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return; // erst aktiv, wenn ID gesetzt
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
