// Tambah proyek baru cukup dengan menambah satu objek di array ini.
// Thumbnail: kalau "image" kosong, otomatis memakai gambar sementara (img/placeholder.jpg).
const PLACEHOLDER = 'img/placeholder.jpg';

const PROJECTS = [
  {
    title: 'Surat Kecil Untukmu',
    desc: 'Surat cinta interaktif: pesan acak, efek mesin tik, tombol "Tidak" yang suka kabur, confetti, dan musik romantis.',
    url: 'https://surat-kecil-untukmu.vercel.app/',
    badge: 'Interaktif',
    image: null // isi misal 'img/surat.png' kalau sudah punya thumbnail sendiri
  }
];

const grid = document.getElementById('grid');
document.getElementById('count').textContent = PROJECTS.length;

const cardHTML = (p, i) => `
  <a class="card" style="animation-delay:${i * 90}ms" href="${p.url}" target="_blank" rel="noopener noreferrer">
    <div class="thumb">
      <img src="${p.image || PLACEHOLDER}" alt="${p.title}" loading="lazy">
      <span class="badge">${p.badge}</span>
      <span class="num">${String(i + 1).padStart(2, '0')}</span>
    </div>
    <div class="body">
      <h2>${p.title}</h2>
      <p>${p.desc}</p>
      <span class="open">Buka proyek <span class="arrow">→</span></span>
    </div>
  </a>`;

const soonHTML = (i) => `
  <div class="card soon" style="animation-delay:${i * 90}ms">
    <b>🍳</b><strong>Lagi dimasak di dapur kode</strong>
    <span>Ide absurd berikutnya sedang dirakit. Mampir lagi nanti.</span>
  </div>`;

grid.innerHTML = PROJECTS.map(cardHTML).join('') + soonHTML(PROJECTS.length);

// Bintang berkelip
const stars = document.getElementById('stars');
const total = window.innerWidth < 600 ? 25 : 45;
for(let i = 0; i < total; i++){
  const b = document.createElement('b');
  b.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${3 + Math.random()*4}s;--w:${Math.random()*5}s`;
  stars.appendChild(b);
}

// Efek miring halus pada kartu (hanya di perangkat dengan mouse)
if(window.matchMedia('(hover:hover)').matches){
  grid.querySelectorAll('.card:not(.soon)').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - .5) * -6, ry = ((x / r.width) - .5) * 6;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}
