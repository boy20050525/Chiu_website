// scripts.js

// Loading Screen
window.addEventListener('load', function () {
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorTrails = [];
for (let i = 0; i < 10; i++) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(trail);
  cursorTrails.push(trail);
}

let mouseX = 0, mouseY = 0;
let trails = [];

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';

  trails.unshift({ x: mouseX, y: mouseY });
  if (trails.length > 10) trails.pop();

  cursorTrails.forEach((trail, index) => {
    const trailPos = trails[index];
    if (trailPos) {
      trail.style.left = trailPos.x + 'px';
      trail.style.top = trailPos.y + 'px';
      trail.style.opacity = (10 - index) / 10;
    }
  });
});

// Floating Shapes
function createFloatingShapes() {
  const container = document.querySelector('.floating-shapes');
  for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div');
    shape.className = 'shape';
    shape.style.width = Math.random() * 100 + 20 + 'px';
    shape.style.height = shape.style.width;
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.animationDelay = Math.random() * 8 + 's';
    shape.style.animationDuration = (Math.random() * 4 + 6) + 's';
    container.appendChild(shape);
  }
}
createFloatingShapes();

// Scroll Progress Bar
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / documentHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Section Observer
const sections = document.querySelectorAll('section');
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);
sections.forEach(section => observer.observe(section));

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.add('typewriter');
    }
  }
  type();
}
setTimeout(() => {
  const typewriterText = document.querySelector('.typewriter-text');
  typeWriter(typewriterText, '一個被茶毒的AI工程師', 80);
}, 2000);

// Scroll to Top
document.querySelector('.icon-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('section:first-of-type')?.scrollIntoView({ behavior: 'smooth' });
});



//REFRESH PAGE WILL reset to the top page
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// Smooth Scroll
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// Parallax Images
window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('img');
  parallaxElements.forEach(element => {
    const speed = 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Interactive Hover Effects
const interactiveElements = document.querySelectorAll('img, .btn, strong');
interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', function () {
    this.style.filter = 'brightness(1.1) contrast(1.1)';
  });
  element.addEventListener('mouseleave', function () {
    this.style.filter = 'brightness(1) contrast(1)';
  });
});

// Ripple Button Effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Fullpage Scroll (Segmented Section Scrolling)
let isScrolling = false;
window.addEventListener('wheel', function (e) {
  if (isScrolling) return;
  isScrolling = true;
  const direction = e.deltaY > 0 ? 1 : -1;
  const currentSection = [...sections].find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 10 && rect.bottom >= 10;
  });
  if (!currentSection) return;
  const nextSection = direction === 1
    ? currentSection.nextElementSibling
    : currentSection.previousElementSibling;
  if (nextSection && nextSection.tagName.toLowerCase() === 'section') {
    nextSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => isScrolling = false, 1200);
  } else {
    isScrolling = false;
  }
}, { passive: false });

