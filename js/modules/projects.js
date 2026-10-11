import { qs, qsa, lockBodyScroll, unlockBodyScroll } from './utils.js';
import { animateStatValue } from './counters.js';
export const PROJECTS = [
  {
    id: 'portfolio-v1',
    title: 'Portfolio V1',
    tags: ['html', 'css', 'javascript'],
    tagLabels: ['HTML5', 'CSS3', 'JavaScript'],
    summary: 'Versi pertama portofolio pribadi saya — tema gelap dengan aksen biru, berisi profil, skills, projects, dan form kontak yang langsung masuk ke email.',
    thumbIcon: 'code',
    thumbnail: 'assets/images/thumb-portfolio-v1.jpg',
    status: null,
    github: null,
    live: 'https://portfolio-mu-taupe-jw24mfk57j.vercel.app/',
    liveLabel: 'Kunjungi',
    caseStudy: {
      problem: 'Saya butuh tempat untuk memperkenalkan diri, menampilkan skills, dan mengumpulkan project yang sudah dikerjakan dalam satu website, sebagai langkah awal membangun identitas sebagai developer.',
      solution: 'Membangun website portofolio lengkap dengan HTML, CSS, dan JavaScript murni: bagian profil, skills, projects, dan kontak, dengan tema gelap beraksen biru dan interaksi dasar.',
      features: [
        'Tema gelap dengan aksen biru',
        'Bagian profil, skills, dan projects',
        'Form kontak yang bisa menerima pesan lewat email',
        'Sudah di-deploy dan bisa diakses online'
      ],
      challenges: 'Menyusun struktur informasi yang lengkap sambil menjaga layout tetap rapi dan responsive.',
      learned: 'Dasar membangun website dari nol, mulai dari struktur halaman, styling, interaksi JavaScript, sampai deploy dan menghubungkan form ke layanan email.'
    }
  },
  {
    id: 'football-universe-elite',
    title: 'Football Universe Elite',
    tags: ['nextjs', 'javascript'],
    tagLabels: ['Next.js', 'JavaScript'],
    summary: 'Platform sepak bola interaktif dengan kuis, statistik, kompetisi, leaderboard, berita, dan tantangan harian "Guess The Player" yang memberi XP.',
    thumbIcon: 'code',
    thumbnail: 'assets/images/thumb-football-universe-elite.jpg',
    status: null,
    github: null,
    live: 'https://football-universe-elite.vercel.app/',
    liveLabel: 'Kunjungi',
    caseStudy: {
      problem: 'Penggemar sepak bola biasanya harus berpindah-pindah situs untuk kuis, statistik, dan berita, dan jarang ada yang membuat pengalamannya terasa seperti game.',
      solution: 'Membangun satu platform dengan Next.js yang menggabungkan kuis, statistik, kompetisi, leaderboard, dan berita, dilengkapi sistem XP dan tantangan harian agar pengguna terus kembali.',
      features: [
        'Navigasi lengkap: Home, Quiz, Statistics, Competitions, Leaderboard, News, Profile, dll',
        '',
        '',
        '',
        '',
        '',
        ''
      ],
      challenges: 'Menjaga banyak halaman dan fitur tetap konsisten secara tampilan dan mudah dinavigasi.',
      learned: 'Membangun aplikasi multi-halaman dengan Next.js, mengelola struktur komponen, serta membawa proyek sampai benar-benar bisa dicoba orang lain.'
    }
  },
  {
    id: 'soon-1',
    title: '???',
    placeholder: true,
    tags: [],
    tagLabels: [],
    summary: '???',
    thumbIcon: 'code',
    thumbnail: 'assets/images/thumb-coming-soon.jpg',
    status: 'Coming Soon',
    github: null,
    live: null,
    liveLabel: null,
    caseStudy: {
      problem: '???',
      solution: '???',
      features: ['???'],
      challenges: '???',
      learned: '???'
    }
  },
  {
    id: 'soon-2',
    title: '???',
    placeholder: true,
    tags: [],
    tagLabels: [],
    summary: '???',
    thumbIcon: 'code',
    thumbnail: 'assets/images/thumb-coming-soon.jpg',
    status: 'Coming Soon',
    github: null,
    live: null,
    liveLabel: null,
    caseStudy: {
      problem: '???',
      solution: '???',
      features: ['???'],
      challenges: '???',
      learned: '???'
    }
  },
  {
    id: 'soon-3',
    title: '???',
    placeholder: true,
    tags: [],
    tagLabels: [],
    summary: '???',
    thumbIcon: 'code',
    thumbnail: 'assets/images/thumb-coming-soon.jpg',
    status: 'Coming Soon',
    github: null,
    live: null,
    liveLabel: null,
    caseStudy: {
      problem: '???',
      solution: '???',
      features: ['???'],
      challenges: '???',
      learned: '???'
    }
  }
];

// Di balik website ini — dibuka dari command palette (bukan kartu proyek).
// Memakai `sections` (bukan caseStudy) agar tampilannya berbeda dari detail proyek.
export const SITE_INFO = {
  id: 'site-info',
  title: 'Di Balik Website Ini',
  github: null,
  live: null,
  sections: [
    {
      heading: 'Tujuan',
      text: 'Website ini dibuat sebagai tempat memperkenalkan diri, menampilkan proyek, dan mencatat perkembangan belajar front-end dari waktu ke waktu.'
    },
    {
      heading: 'Isi website',
      facts: [
        ['Home', 'Perkenalan singkat dan kartu kode profil'],
        ['Meet Andika', 'Sisi personal di luar kode, lengkap dengan galeri foto'],
        ['About', 'Profil, cara berpikir, dan tujuan ke depan'],
        ['Workflow', 'Alur kerja dari Discover sampai Deploy'],
        ['Projects', 'Kumpulan proyek beserta detail ceritanya'],
        ['Journey', 'Perjalanan belajar dalam bentuk timeline'],
        ['Contact', 'Form untuk mengirim pesan langsung ke email']
      ]
    },
    {
      heading: 'Fitur',
      list: [
        'Tema gelap dan terang yang diingat oleh browser',
        'Menu pencarian cepat untuk berpindah antar bagian',
        'Kartu kode di hero dengan efek mengetik',
        'Layar loading dan animasi saat halaman di-scroll',
        'Galeri foto yang berganti otomatis',
        'Angka statistik yang bergerak saat terlihat',
        'Efek sorot mengikuti kursor di desktop',
        'Tampilan responsive untuk HP, tablet, dan laptop'
      ]
    },
    {
      heading: 'Perkembangan',
      list: [
        'Berawal dari Portfolio V1 dengan tema gelap beraksen biru',
        'Berkembang lewat beberapa versi hingga tampilan yang sekarang',
        'Bagian GitHub diganti Workflow agar lebih menceritakan cara kerja',
        'Galeri di Meet Andika ditambahkan untuk memperlihatkan sisi personal',
        'Form kontak dihubungkan agar pesan masuk langsung ke email',
        'Logo di navbar dihapus supaya tampilan lebih bersih'
      ]
    },
    {
      heading: 'Kualitas',
      list: [
        'Kode dipisah per fitur, jadi proyek baru bisa ditambahkan tanpa mengubah bagian lain',
        'Gambar dimuat saat dibutuhkan dan thumbnail sudah dikompres',
        'Pratinjau saat link dibagikan dan SEO dasar sudah diatur',
        'Tautan lompat ke konten utama dan label ARIA pada tombol serta dialog',
        'Menu pencarian bisa dipakai lewat keyboard: panah, Enter, dan Esc',
        'Animasi dikurangi untuk pengunjung yang memilih gerak minimal'
      ]
    },
    {
      heading: 'Masukan',
      text: 'Punya saran untuk website ini? Kirim lewat bagian Contact.'
    }
  ]
};

const ICONS = {
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 8 4 12l5 4M15 8l5 4-5 4"/></svg>`,
  weather: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`
};

function projectCardHTML(project){
  const badge = project.status ? `<span class="badge-soon">${project.status}</span>` : '';
  const githubBtn = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">GitHub</a>`
    : '';
  const liveBtn = project.live
    ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm">${project.liveLabel || 'Kunjungi'}</a>`
    : '';

  return `
    <article class="project-card" data-id="${project.id}" data-category="${project.tags.join(' ')}" data-reveal="up">
      <div class="project-thumb${project.thumbnail ? ' has-img' : ''}">
        ${badge}
        ${project.thumbnail
          ? `<img src="${project.thumbnail}" alt="Preview ${project.title}" loading="lazy">`
          : `<div class="thumb-icon">${ICONS[project.thumbIcon] || ICONS.code}</div>`}
      </div>
      <div class="project-body">
        <h3>${project.placeholder ? '<span class="rainbow-text">???</span>' : project.title}</h3>
        <p>${project.placeholder ? '<span class="rainbow-text">???</span>' : project.summary}</p>
        <div class="project-actions">
          ${githubBtn}
          ${liveBtn}
          <button type="button" class="btn btn-ghost btn-sm js-case-study" data-id="${project.id}">Detail</button>
        </div>
      </div>
    </article>`;
}

export function renderProjects(){
  const grid = qs('#project-grid');
  if(!grid) return;
  grid.innerHTML = PROJECTS.map(projectCardHTML).join('');
  const stat = qs('#stat-projects');
  if(stat) animateStatValue(stat, PROJECTS.length, '+');
}

export function initProjectFilter(){
  const buttons = qsa('.filter-btn');
  if(!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      qsa('.project-card').forEach((card) => {
        const cats = card.dataset.category.split(' ');
        const match = filter === 'all' || cats.includes(filter);
        card.classList.toggle('is-hidden', !match);
      });
    });
  });
}

export function initProjectModal(){
  const overlay = qs('#project-modal');
  if(!overlay) return;
  const closeBtn = qs('#modal-close');

  const open = (id) => {
    const project = id === SITE_INFO.id ? SITE_INFO : PROJECTS.find((p) => p.id === id);
    if(!project) return;
    const fixed = qsa('#project-modal .modal > .modal-section');
    const custom = qs('#modal-custom');
    if(project.sections){
      qs('#modal-title').textContent = project.title;
      fixed.forEach((el) => { el.style.display = 'none'; });
      custom.innerHTML = project.sections.map((sec) => {
        let body = '';
        if(sec.text) body = `<p>${sec.text}</p>`;
        else if(sec.list) body = `<ul>${sec.list.map((f) => `<li>${f}</li>`).join('')}</ul>`;
        else if(sec.facts) body = `<div class="modal-facts">${sec.facts.map(([k, v]) => `<div class="modal-fact"><span>${k}</span><span>${v}</span></div>`).join('')}</div>`;
        else if(sec.chips) body = `<div class="tech-badges">${sec.chips.map((c) => `<span>${c}</span>`).join('')}</div>`;
        return `<div class="modal-section"><h4>${sec.heading}</h4>${body}</div>`;
      }).join('');
    } else {
      custom.innerHTML = '';
      fixed.forEach((el) => { el.style.display = ''; });
      const Q = '<span class="rainbow-text">???</span>';
      const cs = project.caseStudy;
      const setText = (sel, val) => {
        const el = qs(sel);
        if(project.placeholder) el.innerHTML = Q; else el.textContent = val;
      };
      setText('#modal-title', project.title);
      setText('#modal-problem', cs.problem);
      setText('#modal-solution', cs.solution);
      setText('#modal-challenges', cs.challenges);
      setText('#modal-learned', cs.learned);
      qs('#modal-features').innerHTML = cs.features.map((f) => `<li>${f}</li>`).join('');
    }

    const githubLink = qs('#modal-github');
    const liveLink = qs('#modal-live');
    if(project.github){ githubLink.href = project.github; githubLink.style.display = ''; }
    else { githubLink.style.display = 'none'; }
    if(project.live){ liveLink.href = project.live; liveLink.textContent = project.liveLabel || 'Kunjungi'; liveLink.style.display = ''; }
    else { liveLink.style.display = 'none'; }

    overlay.classList.add('open');
    lockBodyScroll();
    closeBtn.focus();
  };

  const close = () => {
    overlay.classList.remove('open');
    unlockBodyScroll();
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-case-study');
    if(trigger) open(trigger.dataset.id);
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
  window.__openProjectModal = open;
}
