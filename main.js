// ── Custom cursor ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .project-card, .skill-tag, .cv-item').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('expand'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});

// ── Scroll reveal ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Nav active link highlight ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
});

// ── Dropdown table rows ──────────────────────────────────────────
document.querySelectorAll('.row-toggle').forEach(row => {
  row.addEventListener('click', () => {
    const target = document.getElementById(row.dataset.target);
    const isOpen = row.classList.contains('open');
    row.classList.toggle('open', !isOpen);
    target.classList.toggle('open', !isOpen);
  });
});

// ── Intro hackathon toggle ──
const introToggle = document.getElementById('hackathon-intro-toggle');
const introContent = document.getElementById('hackathon-intro-content');
introToggle.addEventListener('click', () => {
  introToggle.classList.toggle('open');
  introContent.classList.toggle('open');
});
