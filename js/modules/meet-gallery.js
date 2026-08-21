import { qs, qsa, prefersReducedMotion } from './utils.js';

// Meet Andika — autoplaying two-photo fade slider. Dots are the only manual
// control (per design brief). Isolated to elements inside #meet.
const INTERVAL_MS = 5500;

export function initMeetGallery(){
  const photo = qs('.meet-photo');
  if(!photo) return;

  const slides = qsa('.meet-slide', photo);
  const dots = qsa('.meet-dot', photo);
  if(!slides.length) return;

  let index = slides.findIndex((s) => s.classList.contains('is-active'));
  if(index < 0) index = 0;
  let timer = null;

  function show(next){
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', String(i === index));
    });
  }

  function start(){
    if(prefersReducedMotion() || slides.length < 2) return;
    stop();
    timer = setInterval(() => show(index + 1), INTERVAL_MS);
  }

  function stop(){
    clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    show(i);
    start(); // manual pick resets the autoplay countdown instead of fighting it
  }));

  photo.addEventListener('mouseenter', stop);
  photo.addEventListener('mouseleave', start);
  photo.addEventListener('focusin', stop);
  photo.addEventListener('focusout', start);

  start();
}
