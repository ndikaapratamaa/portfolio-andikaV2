import { qs } from './utils.js';
import { animateStatValue } from './counters.js';

// This module no longer renders any GitHub UI — the dedicated GitHub
// section was replaced by "Workflow". It only keeps the "Public
// Repositories" stat in the Statistics section in sync with the real
// account, so that number doesn't go stale or silently disappear.
const GITHUB_USERNAME = 'ndikaapratamaa';

export async function initGitHub(){
  const repoStat = qs('#stat-repos');
  if(!repoStat) return;

  try{
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if(!res.ok) throw new Error('GitHub API request failed');
    const user = await res.json();
    animateStatValue(repoStat, user.public_repos ?? 0, '+');
  } catch (err){
    repoStat.textContent = '—';
  }
}
