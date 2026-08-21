import { qs, typeInto } from './utils.js';

export function initLoader(){
  const loader = qs('#loader');
  const typeTarget = qs('#loader-type');
  if(!loader) return;

  if(typeTarget) typeInto(typeTarget, 'npm run build:portfolio', 30);

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 500);
  });
}
