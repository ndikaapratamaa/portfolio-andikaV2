import { qsa } from './utils.js';

export function initStatCounters(){
  const nums = qsa('.stat-number[data-count]');
  if(!nums.length) return;

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if(Number.isNaN(target)) return;
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    function step(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting && entry.target.dataset.count !== '0' ){
        animateCount(entry.target);
        observer.unobserve(entry.target);
      } else if(entry.isIntersecting){
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach((el) => observer.observe(el));
}

// Called by github.js once the real repo count is known, so the
// "Public Repositories" stat animates the same way as the static ones.
export function animateStatValue(el, target, suffix = ''){
  if(!el || Number.isNaN(target)) return;
  const duration = 1000;
  const start = performance.now();
  function step(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
