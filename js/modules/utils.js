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

export function initRealViewportHeight(){
  const setVh = () => {
    document.documentElement.style.setProperty('--real-vh', `${window.innerHeight * 0.01}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);
}


let __scrollLockY = 0;
let __scrollLockCount = 0;

export function lockBodyScroll(){
  if(__scrollLockCount === 0){
    __scrollLockY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${__scrollLockY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }
  __scrollLockCount++;
}

export function unlockBodyScroll(){
  __scrollLockCount = Math.max(0, __scrollLockCount - 1);
  if(__scrollLockCount === 0){
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, __scrollLockY);
  }
}
