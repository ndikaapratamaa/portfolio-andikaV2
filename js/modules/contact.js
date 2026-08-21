import { qs, qsa } from './utils.js';

export function initRipple(){
  qsa('.js-ripple').forEach((btn) => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

export function initContactForm(){
  const form = qs('#contact-form');
  const status = qs('#form-status');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if(!name || !message || !emailOk){
      status.textContent = 'Mohon lengkapi nama, email yang valid, dan pesan.';
      status.className = 'form-status err';
      return;
    }

    // No backend connected yet — this simulates a successful send.
    // Replace this block with a real fetch() call to your email service.
    status.textContent = `Terima kasih, ${name}! Pesanmu sudah tercatat (demo — belum terkirim ke server).`;
    status.className = 'form-status ok';
    form.reset();
  });
}

