import { qs, qsa } from './utils.js';

export function initCursorSpotlight(){
  const spotlight = qs('#cursor-spotlight');
  const dot = qs('#cursor-dot');
  if(!spotlight || !dot) return;
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--x', e.clientX + 'px');
    spotlight.style.setProperty('--y', e.clientY + 'px');
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });

  // Grow the dot slightly over interactive elements for feedback.
  qsa('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => dot.classList.add('is-active'));
    el.addEventListener('mouseleave', () => dot.classList.remove('is-active'));
  });
}

// Magnetic buttons: nudge toward the cursor within a small radius.
export function initMagneticButtons(){
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const items = qsa('.js-magnetic');

  items.forEach((el) => {
    el.classList.add('magnetic');
    const strength = 18;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      el.style.setProperty('--mx', `${(mx / rect.width) * strength}px`);
      el.style.setProperty('--my', `${(my / rect.height) * strength}px`);
    });

    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  });
}

// Subtle 3D tilt for tech/project cards based on pointer position.
export function initTiltCards(){
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cards = qsa('.js-tilt');

  cards.forEach((card) => {
    card.classList.add('tilt');
    const maxTilt = 7;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - py) * maxTilt;
      const rotateY = (px - 0.5) * maxTilt;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
    });
  });
}
