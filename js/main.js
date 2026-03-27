// ===========================
// NETWORK CANVAS ANIMATION
// ===========================
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

let nodes = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createNodes() {
  nodes = [];
  const count = Math.min(60, Math.floor(window.innerWidth / 25));
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
}

function drawNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update positions
  nodes.forEach(node => {
    node.x += node.vx;
    node.y += node.vy;
    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
  });

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 140;

      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 245, 196, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 245, 196, ${node.opacity})`;
    ctx.fill();
  });

  animationId = requestAnimationFrame(drawNetwork);
}

resizeCanvas();
createNodes();
drawNetwork();

window.addEventListener('resize', () => {
  resizeCanvas();
  createNodes();
});

// ===========================
// NAVIGATION
// ===========================
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// INTERSECTION OBSERVER
// ===========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Add fade-in class to elements
const sections = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline__item, .contact__link');
sections.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===========================
// SKILL BAR ANIMATION
// ===========================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.skill-bar__fill');
      bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--target-width', width + '%');
        bar.classList.add('animated');
      });
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #28ca41, #00bc8c)';
    contactForm.reset();

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
});

// ===========================
// TYPING EFFECT (Terminal)
// ===========================
function typewriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// ===========================
// ACTIVE NAV LINK
// ===========================
const sectionIds = ['home', 'about', 'skills', 'projects', 'certifications', 'education', 'contact'];
const navLinks = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = id;
      }
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent-cyan)';
    }
  });
});

// ===========================
// STAGGER ANIMATION DELAYS
// ===========================
document.querySelectorAll('.skills__grid .skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.projects__grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// ===========================
// CURSOR GLOW (DESKTOP)
// ===========================
const cursor = document.createElement('div');
cursor.style.cssText = `
  width: 20px; height: 20px;
  background: radial-gradient(circle, rgba(0,245,196,0.3), transparent);
  border: 1px solid rgba(0,245,196,0.4);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s, width 0.3s, height 0.3s;
  display: none;
`;
document.body.appendChild(cursor);

if (window.matchMedia('(pointer: fine)').matches) {
  cursor.style.display = 'block';
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.background = 'radial-gradient(circle, rgba(0,245,196,0.15), transparent)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'radial-gradient(circle, rgba(0,245,196,0.3), transparent)';
    });
  });
}

console.log('%c[AR] Network Portfolio Loaded', 'color: #00f5c4; font-size: 14px; font-family: monospace;');
console.log('%cBuilt with passion for networking & code', 'color: #8892a4; font-family: monospace;');
