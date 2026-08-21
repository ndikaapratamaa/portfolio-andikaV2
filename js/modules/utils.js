// Small shared helpers used across modules.
export const qs = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function debounce(fn, wait = 150){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// Types a string into a target element one character at a time.
// Returns a Promise that resolves once typing finishes.
export function typeInto(el, text, speed = 28){
  return new Promise((resolve) => {
    if(prefersReducedMotion()){
      el.textContent += text;
      resolve();
      return;
    }
    let i = 0;
    (function step(){
      if(i <= text.length){
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        resolve();
      }
    })();
  });
}

export function wait(ms){
  return new Promise((resolve) => setTimeout(resolve, ms));
}
