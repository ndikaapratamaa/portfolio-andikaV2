import { qs, prefersReducedMotion, wait } from './utils.js';

// Lines are pre-tokenized as HTML so we can color keys/strings/punctuation
// while still typing character-by-character underneath.
const CODE_LINES = [
  `<span class="tok-key">const</span> <span class="tok-fn">developer</span> <span class="tok-punc">=</span> <span class="tok-punc">{</span>`,
  `&nbsp;&nbsp;name<span class="tok-punc">:</span> <span class="tok-str">"Andika Pratama"</span><span class="tok-punc">,</span>`,
  `&nbsp;&nbsp;role<span class="tok-punc">:</span> <span class="tok-str">"Front-End Developer"</span><span class="tok-punc">,</span>`,
  `&nbsp;&nbsp;based_in<span class="tok-punc">:</span> <span class="tok-str">"Pacitan, Indonesia"</span><span class="tok-punc">,</span>`,
  `&nbsp;&nbsp;focus<span class="tok-punc">:</span> <span class="tok-str">"Frontend & UI"</span><span class="tok-punc">,</span>`,
  `&nbsp;&nbsp;approach<span class="tok-punc">:</span> <span class="tok-str">"learn, build, refine"</span><span class="tok-punc">,</span>`,
  `<span class="tok-punc">};</span>`,
];

export async function initHeroTerminal(){
  const body = qs('#terminal-body');
  if(!body) return;

  if(prefersReducedMotion()){
    body.innerHTML = CODE_LINES
      .map((html, i) => `<div><span class="ln">${i + 1}</span>${html}</div>`)
      .join('');
    return;
  }

  for(let i = 0; i < CODE_LINES.length; i++){
    const lineEl = document.createElement('div');
    const lnEl = document.createElement('span');
    lnEl.className = 'ln';
    lnEl.textContent = i + 1;
    lineEl.appendChild(lnEl);

    const contentEl = document.createElement('span');
    lineEl.appendChild(contentEl);
    body.appendChild(lineEl);

    // Type the plain-text version, then swap in the tokenized HTML —
    // gives the visual of typing without fighting innerHTML mid-type.
    const plain = CODE_LINES[i].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    await typeLine(contentEl, plain, 16);
    contentEl.innerHTML = CODE_LINES[i];
    await wait(90);
  }

  const caret = document.createElement('span');
  caret.className = 'term-caret';
  body.appendChild(caret);
}

function typeLine(el, text, speed){
  return new Promise((resolve) => {
    let i = 0;
    (function step(){
      if(i <= text.length){
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        resolve();
      }
    })();
  });
}
