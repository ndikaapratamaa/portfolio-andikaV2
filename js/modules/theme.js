import { qs } from './utils.js';

export function initThemeToggle(){
  const toggle = qs('#theme-toggle');
  const icon = qs('#theme-icon');
  if(!toggle) return;

  const apply = (light) => {
    document.documentElement.classList.toggle('light-mode', light);
    icon.innerHTML = light
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
      : '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>';
    toggle.setAttribute('aria-label', light ? 'Ganti ke mode gelap' : 'Ganti ke mode terang');
  };

  const saved = localStorage.getItem('andika-theme');
  apply(saved === 'light');

  toggle.addEventListener('click', () => {
    const isLight = !document.documentElement.classList.contains('light-mode');
    apply(isLight);
    localStorage.setItem('andika-theme', isLight ? 'light' : 'dark');
  });
}
