import { qs, qsa } from './utils.js';
import { animateStatValue } from './counters.js';

// Single source of truth for project content — reused by the grid,
// the case-study modal, and the command palette's project search.
export const PROJECTS = [
  {
    id: 'update-portfolio',
    title: 'Update Portfolio',
    tags: ['html', 'css', 'javascript', 'uiux'],
    tagLabels: ['HTML5', 'CSS3', 'JavaScript'],
    summary: 'Portfolio pribadi yang terus diiterasi dari V1 ke V3 — sekarang dengan hero personal, bento grid, dan command palette, dibangun murni dengan vanilla JS.',
    thumbIcon: 'code',
    status: null,
    github: null,
    live: 'index.html',
    liveLabel: 'Kembali ke Web',
    caseStudy: {
      problem: 'Portfolio pertama dibuat sebagai langkah awal untuk memperkenalkan diri, skills, dan project yang sudah dikerjakan, tapi strukturnya masih sederhana dan belum punya identitas personal yang kuat. Versi kedua memperbaiki visual dan struktur informasi, namun masih terasa generik — layout template, tanpa elemen visual yang benar-benar mencerminkan identitas sebagai developer.',
      solution: 'Portfolio ini terus di-update lewat tiga iterasi: V1 membangun struktur lengkap (profil, skills, projects, contact) dengan interaksi dasar. V2 memperbaiki visual, typography, dan UX supaya lebih terorganisir dan konsisten. V3 merancang ulang dari nol dengan satu ide visual yang konsisten — bahasa "IDE" (title bar, monospace, badge status) yang menyatukan hero, alur kerja, dan proyek, dipadukan dengan potret personal agar tetap terasa manusiawi.',
      features: [
        'Hero personal dengan potret dan glow lembut sebagai anchor visual',
        'Bento grid untuk seksi About',
        'Command palette (Ctrl/Cmd+K) untuk navigasi cepat',
        'Modal studi kasus di setiap proyek',
        'Dark/light mode dengan penyimpanan preferensi',
        'Dark/light mode, animasi, dan scroll interaction sejak V1'
      ],
      challenges: 'Di V1-V2: menggabungkan berbagai fitur interaktif sambil menjaga layout tetap responsive, dan menemukan keseimbangan antara menambah visual/interaction dengan menjaga website tetap clean dan ringan. Di V3: menjaga agar setiap micro-interaction tetap terasa halus dan bertujuan, termasuk menghormati preferensi pengguna yang mengaktifkan reduced motion.',
      learned: 'Bahwa membuat portfolio bukan hanya soal menambah fitur, tapi memilih apa yang perlu ditampilkan, menyusun informasi dengan baik, dan terus mengevaluasi desain dari versi sebelumnya — sampai akhirnya paham cara membangun arsitektur JS modular (ES6 modules) yang tetap rapi walau fitur terus bertambah.'
    }
  }
];

const ICONS = {
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 8 4 12l5 4M15 8l5 4-5 4"/></svg>`,
  weather: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`
};

function projectCardHTML(project){
  const badge = project.status ? `<span class="badge-soon">${project.status}</span>` : '';
  const badges = project.tagLabels.map((t) => `<span>${t}</span>`).join('');
  const githubBtn = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">GitHub</a>`
    : '';
  const liveBtn = project.live
    ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm">${project.liveLabel || 'Live Demo'}</a>`
    : '';

  return `
    <article class="project-card" data-id="${project.id}" data-category="${project.tags.join(' ')}" data-reveal="up">
      <div class="project-thumb">
        ${badge}
        <div class="thumb-icon">${ICONS[project.thumbIcon] || ICONS.code}</div>
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <div class="tech-badges">${badges}</div>
        <div class="project-actions">
          ${githubBtn}
          ${liveBtn}
          <button type="button" class="btn btn-ghost btn-sm js-case-study" data-id="${project.id}">Case Study</button>
        </div>
      </div>
    </article>`;
}

export function renderProjects(){
  const grid = qs('#project-grid');
  if(!grid) return;
  grid.innerHTML = PROJECTS.map(projectCardHTML).join('');

  // Projects Completed is real, not a made-up number — it mirrors
  // however many projects actually exist in the array above.
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
    const project = PROJECTS.find((p) => p.id === id);
    if(!project) return;
    qs('#modal-title').textContent = project.title;
    qs('#modal-problem').textContent = project.caseStudy.problem;
    qs('#modal-solution').textContent = project.caseStudy.solution;
    qs('#modal-features').innerHTML = project.caseStudy.features.map((f) => `<li>${f}</li>`).join('');
    qs('#modal-challenges').textContent = project.caseStudy.challenges;
    qs('#modal-learned').textContent = project.caseStudy.learned;

    const githubLink = qs('#modal-github');
    const liveLink = qs('#modal-live');
    if(project.github){ githubLink.href = project.github; githubLink.style.display = ''; }
    else { githubLink.style.display = 'none'; }
    if(project.live){ liveLink.href = project.live; liveLink.textContent = project.liveLabel || 'Live Demo'; liveLink.style.display = ''; }
    else { liveLink.style.display = 'none'; }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
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

  // Exposed so the command palette can jump straight to a case study.
  window.__openProjectModal = open;
}
