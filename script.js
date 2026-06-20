// ══════════════════════════════════════════
//  TYPING ANIMATION
// ══════════════════════════════════════════
const HERO_WORD = 'Saurabh Kr Mishra';

(function typeHeroName() {
  const el       = document.getElementById('typed-name');
  const cursorEl = document.getElementById('typed-cursor');
  const typeDelay  = 100;
  const startDelay = 600;
  let i = 0;

  el.setAttribute('data-text', HERO_WORD);

  setTimeout(() => {
    function typeNext() {
      if (i <= HERO_WORD.length) {
        el.textContent = HERO_WORD.slice(0, i);
        el.setAttribute('data-text', HERO_WORD.slice(0, i));
        i++;
        if (i <= HERO_WORD.length) {
          setTimeout(typeNext, typeDelay);
        } else {
          setTimeout(() => { cursorEl.style.opacity = '0'; }, 1500);
        }
      }
    }
    typeNext();
  }, startDelay);
})();

// ══════════════════════════════════════════
//  GLITCH HOVER EFFECT
// ══════════════════════════════════════════
(function initGlitch() {
  const nameEl   = document.querySelector('.hero-name');
  const textEl   = document.getElementById('typed-name');
  const CHARS    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqr';
  let scrambleInterval = null;
  let isGlitching = false;

  nameEl.addEventListener('mouseenter', () => {
    if (isGlitching) return;
    isGlitching = true;
    nameEl.classList.add('glitching');
    
    let step = 0;
    scrambleInterval = setInterval(() => {
      let display = '';
      for (let idx = 0; idx < HERO_WORD.length; idx++) {
        display += idx < Math.floor((step/15)*HERO_WORD.length) ? HERO_WORD[idx] : CHARS[Math.floor(Math.random()*CHARS.length)];
      }
      textEl.textContent = display;
      textEl.setAttribute('data-text', display);
      step++;
      if (step > 15) {
        clearInterval(scrambleInterval);
        textEl.textContent = HERO_WORD;
        textEl.setAttribute('data-text', HERO_WORD);
        nameEl.classList.remove('glitching');
        isGlitching = false;
      }
    }, 40);
  });
})();

// ══════════════════════════════════════════
//  CUSTOM CURSOR LOGIC
// ══════════════════════════════════════════
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = -200, my = -200, rx = -200, ry = -200;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function refreshHoverListeners() {
  document.querySelectorAll('button, a, .pill, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}
refreshHoverListeners();

(function animCursor() {
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  ring.style.left   = rx + 'px'; ring.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
})();

// ══════════════════════════════════════════
//  THREE.JS BACKGROUND STARFIELD
// ══════════════════════════════════════════
const W = window.innerWidth, H = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), antialias: true, alpha: true });
renderer.setSize(W, H);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
camera.position.z = 25;

// Custom Purple Cosmic Particles
const starGeo = new THREE.BufferGeometry();
const COUNT = 1500;
const pos = new Float32Array(COUNT * 3);
for (let i = 0; i < COUNT * 3; i++) pos[i] = (Math.random() - .5) * 100;
starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const starMat = new THREE.PointsMaterial({ color: 0xa855f7, size: .15, transparent: true, opacity: .6 });
scene.add(new THREE.Points(starGeo, starMat));

// Orbit Central Node
const sphereGeo = new THREE.IcosahedronGeometry(4, 2);
const sphereMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: .08 });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

let targetX = 0, targetY = 0, curX = 0, curY = 0;
document.addEventListener('mousemove', e => {
  targetX = (e.clientX / W - .5) * 2; targetY = (e.clientY / H - .5) * 2;
});

(function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.002; sphere.rotation.y += 0.004;
  curX += (targetX - curX) * .05; curY += (targetY - curY) * .05;
  camera.position.x = curX * 3; camera.position.y = -curY * 3;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
})();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ══════════════════════════════════════════
//  DYNAMIC INFRASTRUCTURE DATA DESCRIPTIONS
// ══════════════════════════════════════════
const panels = {
  about: `
    <h2>About Me</h2>
    <p>I am <strong>Saurabh Kr Mishra</strong>, a Computer Science Engineering student at Uttaranchal University, Dehradun.</p>
    <p>I am passionate about software development, competitive programming, and solving real-world problems. Currently focusing on:</p>
    <ul>
      <li>Data Structures and Algorithms</li>
      <li>C++ Programming</li>
      <li>Web Development</li>
      <li>Problem Solving</li>
    </ul>
    <br>
    <p><em>Currently learning Data Structures and Algorithms and solved 200+ LeetCode Problems.</em></p>
  `,

  education: `
    <h2>Education & Technical Skills</h2>
    <div class="info-block">
      <div class="info-title">Bachelor of Technology (B.Tech)</div>
      <div class="info-subtitle">Computer Science Engineering</div>
      <p>Uttaranchal University, Dehradun<br>Batch: 2023 - 2027 | Graduation Year: 2027</p>
    </div>
    
    <div class="info-block">
      <div class="info-title">Technical Skills</div>
      <div class="skill-pills">
        <span class="pill">C++</span>
        <span class="pill">DSA</span>
        <span class="pill">HTML5</span>
        <span class="pill">CSS3</span>
        <span class="pill">JavaScript</span>
        <span class="pill">React JS</span>
        <span class="pill">SQL</span>
        <span class="pill">GitHub</span>
      </div>
    </div>
  `,

  projects: `
    <h2>Projects & DSA Journey</h2>
    <div class="info-block">
      <div class="info-title">Personal Portfolio</div>
      <p>Responsive portfolio website built using HTML, CSS, JavaScript, and dynamic rendering modules.</p>
      <a href="https://github.com/Saurabhkumar-2003/saurabhkumar-2003" target="_blank" class="pill" style="display:inline-block; margin-top:.5rem; text-decoration:none;">View GitHub</a>
    </div>

    <div class="info-block">
      <div class="info-title">DSA Journey (200+ Problems Solved)</div>
      <p>Solved 200+ LeetCode problems covering complex array manipulations, trees, graphs, dynamic programming, and greedy architectures.</p>
      <a href="https://leetcode.com/u/2301010642/" target="_blank" class="pill" style="display:inline-block; margin-top:.5rem; text-decoration:none;">LeetCode Profile</a>
    </div>
  `,

  contact: `
    <h2>Contact Me</h2>
    <div class="contact-links">
      <a class="contact-link" href="mailto:mishrasaurabhj225@gmail.com">
        <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <div class="contact-link-label">mishrasaurabhj225@gmail.com<span>Email Me Directly</span></div>
      </a>
      <a class="contact-link" href="https://github.com/Saurabhkumar-2003/saurabhkumar-2003" target="_blank">
        <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        <div class="contact-link-label">Saurabhkumar-2003<span>GitHub Profile</span></div>
      </a>
      <a class="contact-link" href="https://linkedin.com/in/saurabhkr2003/" target="_blank">
        <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        <div class="contact-link-label">linkedin.com/in/saurabhkr2003/<span>LinkedIn Connect</span></div>
      </a>
      <a class="contact-link" href="https://leetcode.com/u/2301010642/" target="_blank">
        <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <div class="contact-link-label">2301010642<span>LeetCode Journey</span></div>
      </a>
    </div>
  `
};

// ══════════════════════════════════════════
//  PANEL CONTROLLER LOGIC
// ══════════════════════════════════════════
window.openPanel = function(id) {
  const overlay = document.getElementById('overlay');
  const content = document.getElementById('panel-content');
  
  document.querySelectorAll('.dock-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-${id}`);
  if (activeBtn) activeBtn.classList.add('active');

  if (panels[id]) {
    content.innerHTML = panels[id];
    overlay.classList.add('open');
  }
  refreshHoverListeners();
};

window.closePanel = function() {
  document.getElementById('overlay').classList.remove('open');
  document.querySelectorAll('.dock-btn').forEach(btn => btn.classList.remove('active'));
};

window.handleOverlayClick = function(e) {
  if (e.target.id === 'overlay') closePanel();
};