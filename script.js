const grid = document.getElementById('grid');
const rail = document.getElementById('filterRail');
const countLabel = document.getElementById('countLabel');
const heroTagline = document.getElementById('heroTagline');
const statCount = document.getElementById('statCount');
const toggleBtn = document.getElementById('toggleBtn');


let query = '';

heroTagline.textContent = `Access ${COURSES.length} course books for free — explore, learn, and grow.`;

function renderGrid(){
  const list = query.trim() === ''
    ? COURSES
    : COURSES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  countLabel.textContent = `Showing ${list.length} of ${COURSES.length} courses`;

  grid.innerHTML = list.map(c => `
    <div class="card">
      <div class="card-image">
        <img src="${c.img}" alt="${c.name}" loading="lazy">
      </div>
      <div class="card-info">
        <h3>${c.name}</h3>
        <a class="card-open-btn" href="${c.link}" target="_blank" rel="noopener">
          <span class="btn-icon-circle">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
            </svg>
          </span>
          <span class="btn-ribbon">
            <span class="btn-text">OPEN FOLDER</span>
          </span>
        </a>
      </div>
    </div>
  `).join('');

  if(list.length === 0){
    grid.innerHTML = `<p style="color:var(--text-soft);font-weight:600;grid-column:1/-1;text-align:center;padding:40px 0;">No courses found matching "${query}"</p>`;
  }
}

searchInput.addEventListener('input', (e) => {
  query = e.target.value;
  renderGrid();
});

renderGrid();


function toggleTheme(){
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  toggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('cs_theme', newTheme);
}

(function initTheme(){
  const saved = localStorage.getItem('cs_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.body.setAttribute('data-theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
})();

