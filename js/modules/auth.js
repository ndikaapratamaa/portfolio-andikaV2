import { qs } from './utils.js';

// ---------------------------------------------------------------------
// "Continue with Google" button — placeholder only.
//
// This feature is NOT implemented yet. No Google script is loaded, no
// OAuth flow, no session, nothing. Clicking the button just shows a
// small toast telling the visitor it's not available yet.
//
// To build the real thing later: get an OAuth 2.0 Client ID from
// https://console.cloud.google.com/apis/credentials, load
// https://accounts.google.com/gsi/client, and wire it up here.
// ---------------------------------------------------------------------

let toastTimer = null;

function showToast(message) {
  let toast = qs('#auth-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'auth-toast';
    toast.className = 'auth-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

export function initGoogleAuth() {
  const btn = qs('#google-signin-btn');
  if (!btn) return;

  btn.title = 'Fitur ini belum bisa diakses';
  btn.addEventListener('click', () => {
    showToast('Maaf, fitur ini belum bisa diakses.');
  });
}
