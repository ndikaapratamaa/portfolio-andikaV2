import { initLoader } from './modules/loader.js';
import { initRealViewportHeight } from './modules/utils.js';
import { initNavbar, initMobileMenu, initActiveNavLink, initBackToTop } from './modules/navbar.js';
import { initThemeToggle } from './modules/theme.js';
import { initScrollProgress, initScrollReveal } from './modules/reveal.js';
import { initStatCounters } from './modules/counters.js';
import { initHeroTerminal } from './modules/terminal.js';
import { initMeetGallery } from './modules/meet-gallery.js';
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
  initScrollReveal();
  initStatCounters();
  initHeroTerminal();
  initMeetGallery();

  renderProjects();
  initProjectFilter();
  initProjectModal();
  initGitHub();

  initCommandPalette();
  initRipple();
  initContactForm();
  initGoogleAuth();
});
