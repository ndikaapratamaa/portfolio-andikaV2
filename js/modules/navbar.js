import { qs, qsa } from './utils.js';

export function initNavbar(){
  const nav = qs('#navbar');
  if(!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

export function initMobileMenu(){
}

export function initActiveNavLink(){
  const sections = qsa('main section[id]');
  const links = qsa('.nav-links a');
  if(!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        links.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((sec) => observer.observe(sec));
}

export function initBackToTop(){
  const btn = qs('#back-to-top');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
