// ===============================
// Theme toggle (persisted)
// ===============================
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.classList.add('light');

const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
}

// ===============================
// Mobile nav toggle
// ===============================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

// Close nav on link click + smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navMenu?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// ===============================
// Typing effect (robust, looping)
// ===============================
(function initTyping() {
  const typedEl = document.getElementById('typed-role');
  if (!typedEl) return;

  const roles = [
    'AI/ML Enthusiast',
    'Frontend Developer',
    'Software Engineer'
  ];

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion, show the first role statically.
  if (prefersReduced) {
    typedEl.textContent = roles[0];
    return;
  }

  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  async function typeText(text, speed = 70) {
    for (let i = 0; i <= text.length; i++) {
      typedEl.textContent = text.slice(0, i);
      await wait(speed);
    }
  }

  async function deleteText(speed = 40) {
    const text = typedEl.textContent;
    for (let i = text.length; i >= 0; i--) {
      typedEl.textContent = text.slice(0, i);
      await wait(speed);
    }
  }

  (async function loop() {
    let i = 0;
    while (true) {
      const current = roles[i];
      await typeText(current, 70);
      await wait(900);
      await deleteText(35);
      await wait(250);
      i = (i + 1) % roles.length;
    }
  })();
})();

// ===============================
// Animated stats counter
// ===============================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(c => {
    const target = +c.getAttribute('data-target');
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const tick = () => {
      current += step;
      if (current >= target) {
        current = target;
      } else {
        requestAnimationFrame(tick);
      }
      c.textContent = current.toString();
    };
    tick();
  });
}
const aboutSection = document.getElementById('about');
let statsAnimated = false;
if (aboutSection) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateCounters();
        statsAnimated = true;
      }
    });
  }, { threshold: 0.3 });
  obs.observe(aboutSection);
}

// ===============================
// Contact form handler
// ===============================
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name || !data.email || !data.message) {
    alert('Please fill in all fields.');
    return false;
  }
  const subject = encodeURIComponent('Portfolio Contact — ' + data.name);
  const body = encodeURIComponent(`${data.message}\n\nFrom: ${data.name}\nEmail: ${data.email}`);
  window.location.href = `mailto:kanchanpramanik29.11@gmail.com?subject=${subject}&body=${body}`;
  form.reset();
  return false;
}
window.handleSubmit = handleSubmit;

// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
