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

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
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

    const formData = new FormData(form);
    formData.append('access_key', 'dc4997a3-02b4-44ac-ad4a-f3fb372487c5');
    formData.append('subject', 'Pesan Baru dari Portfolio V2');
    formData.append('from_name', 'Portfolio V2');

    submitBtn.disabled = true;
    status.textContent = 'Mengirim...';
    status.className = 'form-status';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if(data.success){
        status.textContent = `Terima kasih, ${name}! Pesanmu sudah terkirim.`;
        status.className = 'form-status ok';
        form.reset();
      } else {
        status.textContent = 'Maaf, pesan gagal terkirim. Coba lagi nanti ya.';
        status.className = 'form-status err';
      }
    } catch (err) {
      status.textContent = 'Terjadi kesalahan jaringan. Coba lagi nanti ya.';
      status.className = 'form-status err';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
