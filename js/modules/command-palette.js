import { qs, qsa, lockBodyScroll, unlockBodyScroll } from './utils.js';

const STATIC_ITEMS = [
  { label: 'Home', hint: 'Go to section', action: () => scrollToId('home') },
  { label: 'Meet Andika', hint: 'Go to section', action: () => scrollToId('meet') },
  { label: 'About', hint: 'Go to section', action: () => scrollToId('about') },
  { label: 'Workflow', hint: 'Go to section', action: () => scrollToId('workflow') },
  { label: 'Projects', hint: 'Go to section', action: () => scrollToId('projects') },
  { label: 'Journey', hint: 'Go to section', action: () => scrollToId('journey') },
  { label: 'Contact', hint: 'Go to section', action: () => scrollToId('contact') },
  { label: 'Toggle theme', hint: 'Dark / light', action: () => qs('#theme-toggle')?.click() },
  { label: 'Di Balik Website Ini', hint: 'Cara web ini dibuat', action: () => window.__openProjectModal?.('site-info') },
];

function scrollToId(id){
  qs(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
}

export function initCommandPalette(){
  const overlay = qs('#cmdk-overlay');
  // Both triggers open the exact same overlay: #cmdk-trigger (search bar,
  // shown on desktop) and #hamburger (shown on mobile, hidden on desktop
  // via CSS). This guarantees the mobile menu is pixel-identical to the
  // desktop command palette — it's literally the same component, not a
  // separate lookalike that can drift out of sync.
  const triggers = qsa('#cmdk-trigger, #hamburger');
  const input = qs('#cmdk-input');
  const list = qs('#cmdk-list');
  if(!overlay || !input || !list) return;

  let selected = 0;
  let items = [];

  const allItems = () => STATIC_ITEMS;

  function render(query = ''){
    const q = query.trim().toLowerCase();
    items = allItems().filter((item) => item.label.toLowerCase().includes(q));
    selected = 0;

    if(!items.length){
      list.innerHTML = `<p class="cmdk-empty">Tidak ada hasil untuk "${query}".</p>`;
      return;
    }

    list.innerHTML = items.map((item, i) => `
      <div class="cmdk-item${i === 0 ? ' is-selected' : ''}" data-index="${i}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        <span>${item.label}</span>
        <span style="margin-left:auto;color:var(--muted);font-family:var(--font-mono);font-size:.72rem">${item.hint}</span>
      </div>
    `).join('');
  }

  function highlight(){
    qsa('.cmdk-item', list).forEach((el, i) => el.classList.toggle('is-selected', i === selected));
    qs('.cmdk-item.is-selected', list)?.scrollIntoView({ block: 'nearest' });
  }

  function open(){
    overlay.classList.add('open');
    lockBodyScroll();
    input.value = '';
    render();
    // Di layar sentuh (HP), jangan fokus otomatis supaya keyboard tidak muncul sendiri.
    if(!window.matchMedia('(pointer: coarse)').matches){
      setTimeout(() => input.focus(), 50);
    }
  }

  function close(){
    overlay.classList.remove('open');
    unlockBodyScroll();
  }

  function activate(index){
    const item = items[index];
    if(!item) return;
    close();
    item.action();
  }

  triggers.forEach((t) => t.addEventListener('click', open));

  document.addEventListener('keydown', (e) => {
    const isK = e.key.toLowerCase() === 'k';
    if((e.ctrlKey || e.metaKey) && isK){
      e.preventDefault();
      overlay.classList.contains('open') ? close() : open();
      return;
    }
    if(!overlay.classList.contains('open')) return;

    if(e.key === 'Escape') close();
    else if(e.key === 'ArrowDown'){ e.preventDefault(); selected = Math.min(selected + 1, items.length - 1); highlight(); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); selected = Math.max(selected - 1, 0); highlight(); }
    else if(e.key === 'Enter'){ e.preventDefault(); activate(selected); }
  });

  input.addEventListener('input', () => render(input.value));
  list.addEventListener('click', (e) => {
    const el = e.target.closest('.cmdk-item');
    if(el) activate(Number(el.dataset.index));
  });
  overlay.addEventListener('click', (e) => { if(e.target === overlay) close(); });
}
