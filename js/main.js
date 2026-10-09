import { initLoader } from './modules/loader.js';
import { initRealViewportHeight } from './modules/utils.js';
import { initNavbar, initMobileMenu, initActiveNavLink, initBackToTop } from './modules/navbar.js';
import { initThemeToggle } from './modules/theme.js';
import { initScrollProgress, initScrollReveal } from './modules/reveal.js';
import { initStatCounters } from './modules/counters.js';
import { initHeroTerminal } from './modules/terminal.js';
import { renderProjects, initProjectFilter, initProjectModal } from './modules/projects.js';
import { initGitHub } from './modules/github.js';
import { initCommandPalette } from './modules/command-palette.js';
import { initRipple, initContactForm } from './modules/contact.js';
import { initGoogleAuth } from './modules/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  initRealViewportHeight();
  initLoader();
  initNavbar();
  initMobileMenu();
  initActiveNavLink();
  initBackToTop();
  initThemeToggle();
  initScrollProgress();
  // Render project cards first so the scroll-reveal observer can see them.
  renderProjects();
  initScrollReveal();
  initStatCounters();
  initHeroTerminal();

  initProjectFilter();
  initProjectModal();
  initGitHub();

  initCommandPalette();
  initRipple();
  initContactForm();
  initGoogleAuth();
});
