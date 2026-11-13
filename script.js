// ===== Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const toTop = document.getElementById('toTop');

// ===== Mobile menu =====
function setMenu(open) {
  navLinks.classList.toggle('open', open);
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
}
hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ===== Scroll: navbar shadow, back-to-top, active link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  toTop.classList.toggle('show', window.scrollY > 500);
  let current = 'home';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.querySelectorAll('a').forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Fade-in on scroll + skill bar animation =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    const fill = entry.target.querySelector('.fill');
    if (fill) fill.style.width = fill.dataset.level + '%';
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's'; // small stagger
  observer.observe(el);
});

// ===== Contact form validation =====
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
function show(text, ok) {
  msg.textContent = text;
  msg.className = 'form-msg ' + (ok ? 'ok' : 'err');
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = ['name', 'email', 'subject', 'message'].map(id => document.getElementById(id));
  fields.forEach(f => f.classList.remove('error'));
  const empty = fields.filter(f => !f.value.trim());
  empty.forEach(f => f.classList.add('error'));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields[1].value.trim());

  if (empty.length) return show('Please fill in all fields.', false);
  if (!emailOk) { fields[1].classList.add('error'); return show('Please enter a valid email.', false); }

  // Demo only: connect Formspree or a backend here to actually send the message.
  show('Thanks! Your message has been sent.', true);
  form.reset();
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
