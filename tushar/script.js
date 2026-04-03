/* ============================================================
   SDET PORTFOLIO — Enhanced JavaScript v2.0
   Features: 3D floating particles, custom cursor, smooth reveal,
             typewriter with delete, counter animation, skill bars
   ============================================================ */

'use strict';

// ─── Loader ───────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    document.body.classList.add('loaded');
  }, 900);
});

// ─── Custom Cursor ─────────────────────────────────────────
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animate() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animate);
  }
  animate();

  // Hover effect on interactive elements
  const hoverEls = 'a, button, .skill-card, .project-card, .contact-card, .stat-card, .btn, .sc-tags span, .nav-menu li a';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();

// ─── 3D Background Canvas ──────────────────────────────────
(function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, animId;
  let mouse = { x: -1000, y: -1000 };
  const PARTICLE_COUNT = 80;
  const particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Dot {
    constructor() { this.reset(true); }

    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : -10;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = Math.random() * 0.35 + 0.1;
      this.r  = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.45 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
      // Randomly assign colour: cyan or purple
      this.cyan = Math.random() > 0.35;
    }

    update() {
      this.pulse += 0.012;
      this.x += this.vx;
      this.y += this.vy;

      // Mouse repulsion (subtle)
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const force = (140 - dist) / 140 * 0.4;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }

      // Damping
      this.vx *= 0.98;
      this.vy *= 0.98;

      if (this.y > H + 10 || this.x < -20 || this.x > W + 20) this.reset(false);
    }

    draw() {
      const a = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
      const color = this.cyan
        ? `rgba(0, 229, 255, ${a})`
        : `rgba(124, 58, 237, ${a * 0.7})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Dot());

  function connectLines() {
    const MAX_DIST = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const a = (1 - d / MAX_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectLines();
    animId = requestAnimationFrame(loop);
  }

  loop();
})();

// ─── Typewriter (with delete) ──────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'QA Engineer',
    'Test Automation Specialist',
    'SDET Professional',
    'Mobile Testing Expert',
    'CI/CD Architect'
  ];

  let roleIdx = 0, charIdx = 0, deleting = false, paused = false;

  function tick() {
    const current = roles[roleIdx];

    if (paused) {
      paused = false;
      setTimeout(tick, 1400);
      return;
    }

    if (!deleting) {
      if (charIdx < current.length) {
        el.textContent = current.slice(0, ++charIdx);
        setTimeout(tick, 70 + Math.random() * 40);
      } else {
        paused = true;
        setTimeout(tick, 100);
      }
    } else {
      if (charIdx > 0) {
        el.textContent = current.slice(0, --charIdx);
        setTimeout(tick, 38);
      } else {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 300);
      }
    }

    if (!deleting && el.textContent === current) {
      deleting = true;
    }
  }

  setTimeout(tick, 800);
})();

// ─── Counter Animation ─────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 2000;
      const step   = target / (dur / 16);
      let val = 0;

      function update() {
        val += step;
        if (val < target) {
          el.textContent = Math.floor(val);
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }
      update();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ─── Skill Progress Bars ───────────────────────────────────
(function initSkillBars() {
  const fills = document.querySelectorAll('.sbi-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const w  = el.dataset.width;
      requestAnimationFrame(() => { el.style.width = w + '%'; });
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  fills.forEach(f => { f.style.width = '0'; observer.observe(f); });
})();

// ─── Scroll Reveal ─────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

// ─── Navbar: active link + scroll hide ────────────────────
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const links   = document.querySelectorAll('.nav-menu li a');
  const sections = document.querySelectorAll('section[id]');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const cur = window.pageYOffset;

    // Hide / show on scroll direction
    if (cur > 80) {
      if (cur > lastScroll + 5) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
      } else if (cur < lastScroll - 5) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
      }
    } else {
      navbar.classList.remove('scroll-down', 'scroll-up');
    }
    lastScroll = cur;

    // Active section highlighting
    const scrollPos = cur + 150;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id);
        });
      }
    });
  });
})();

// ─── Mobile Menu ───────────────────────────────────────────
(function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
})();

// ─── Smooth Scroll (nav links) ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('nav')?.offsetHeight || 72;
    window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
  });
});

// ─── Scroll-to-Top Button ──────────────────────────────────
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.pageYOffset > 400);
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ─── Project card tilt effect ──────────────────────────────
(function initTilt() {
  const cards = document.querySelectorAll('.project-card, .skill-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left) / r.width  - 0.5;
      const y  = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ─── Console Easter Egg ────────────────────────────────────
console.log('%c  TUSHAR SHARMA — SDET & QA ENGINEER  ', 'background:#00e5ff;color:#03070f;font-size:14px;font-weight:bold;padding:8px 16px;border-radius:4px;');
console.log('%c> Available for new opportunities. Reach out: tushar07988@gmail.com', 'color:#7dd3fc;font-size:12px;');
console.log('%c> GitHub: https://github.com/TUSHAR7988', 'color:#a78bfa;font-size:12px;');
