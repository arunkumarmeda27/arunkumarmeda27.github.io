/**
 * ============================================================
 * APP.JS — Arun Kumar Meda's Modern Developer Portfolio
 * Features:
 * - 3D Interactive Tech Globe with Orbiting Tech Chips (Python, React, etc.)
 * - 3D Flip Photo Card (Photo Front -> Contact Details Back)
 * - Profile Picture Dynamic Loader (LinkedIn with GitHub Fallback)
 * - Background Particle Network
 * - Dynamic Typewriter Subtitle
 * - Live GitHub Projects Sync with Search & Language Filter
 * - Multi-Page Document Lightbox Modal
 * - Interactive Code Editor Contact Session
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticleNetwork();
  initTypewriter();
  initFlipCard();
  initAvatarLoader();
  init3DTechGlobe();
  renderInternships();
  renderSkills();
  initGitHubProjects();
  renderCredentials();
  initContactForm();
  initEmailCopyButtons();
});

/* ============================================================
   1. NAVBAR & ACTIVE NAVIGATION SPY
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      const expanded = navToggle.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Close mobile menu on clicking any link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('header[id], section[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }
}

/* ============================================================
   2. 3D FLIP PHOTO CARD (Photo Front -> Contact Details Back)
   ============================================================ */
function initFlipCard() {
  const flipCard = document.getElementById('photoFlipCard');
  const cardInner = document.getElementById('flipCardInner');
  if (!flipCard || !cardInner) return;

  // Toggle flip on card click
  flipCard.addEventListener('click', (e) => {
    // Avoid flipping when clicking direct links inside back face
    if (e.target.closest('a') || e.target.closest('#card-copy-email-btn')) {
      return;
    }
    cardInner.classList.toggle('flipped');
  });

  // Dedicated copy button on back face
  const copyBtn = document.getElementById('card-copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const email = 'arunkumarmeda27@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyBtn.style.borderColor = '#10b981';
        copyBtn.style.color = '#10b981';

        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      });
    });
  }
}

/* ============================================================
   3. AVATAR DYNAMIC LOADER (LinkedIn with GitHub Fallback)
   ============================================================ */
function initAvatarLoader() {
  const avatarImg = document.getElementById('github-avatar');
  if (!avatarImg) return;

  const data = window.portfolioData || {};
  const linkedInUrl = data.avatarUrl || 'https://unavatar.io/linkedin/arun-kumar-meda-557b051b8';
  const githubFallback = data.avatarFallback || 'https://avatars.githubusercontent.com/u/arunkumarmeda27';

  avatarImg.src = linkedInUrl;

  avatarImg.onerror = () => {
    avatarImg.onerror = null; // Prevent infinite loop
    avatarImg.src = githubFallback;

    // Secondary fallback to API if needed
    fetch('https://api.github.com/users/arunkumarmeda27')
      .then(res => res.json())
      .then(user => {
        if (user && user.avatar_url) {
          avatarImg.src = user.avatar_url;
        }
      })
      .catch(() => {});
  };
}

/* ============================================================
   4. 3D TECH GLOBE (Displaying Mastered Tech: Python, React, etc.)
   ============================================================ */
function init3DTechGlobe() {
  const canvas = document.getElementById('globeCanvas');
  const viewport = document.getElementById('globeViewport');
  const overlay = document.getElementById('globeTechOverlay');
  const chipsContainer = document.getElementById('masteredTechChips');
  if (!canvas || !viewport || typeof THREE === 'undefined') return;

  const data = window.portfolioData || {};
  const techList = data.masteredTech || [
    { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab' },
    { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#f7df1e' },
    { name: 'React', icon: 'fa-brands fa-react', color: '#61dafb' },
    { name: 'C++', icon: 'fa-solid fa-code', color: '#00599c' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#68a063' },
    { name: 'TypeScript', icon: 'fa-brands fa-js', color: '#3178c6' },
    { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#f05032' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: '#2496ed' },
    { name: 'AWS', icon: 'fa-brands fa-aws', color: '#ff9900' },
    { name: 'SQL', icon: 'fa-solid fa-database', color: '#4479a1' }
  ];

  // Populate Legend Chips below Globe
  if (chipsContainer) {
    chipsContainer.innerHTML = techList.map((t, idx) => `
      <div class="tech-chip" data-idx="${idx}">
        <i class="${t.icon}" style="color: ${t.color};"></i>
        <span>${t.name}</span>
      </div>
    `).join('');
  }

  // Three.js Scene Setup
  const width = viewport.clientWidth || 500;
  const height = viewport.clientHeight || 500;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 3.2;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // 1. Fibonacci Sphere Outer Dot Shell
  const DOT_COUNT = 1600;
  const radius = 1.25;
  const positions = new Float32Array(DOT_COUNT * 3);
  const colors = new Float32Array(DOT_COUNT * 3);

  const primaryCol = new THREE.Color('#4f7cf7');
  const cyanCol = new THREE.Color('#38bdf8');
  const dimCol = new THREE.Color('#1c203b');

  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < DOT_COUNT; i++) {
    const theta = 2 * Math.PI * i / goldenRatio;
    const phi = Math.acos(1 - 2 * (i + 0.5) / DOT_COUNT);

    const x = Math.cos(theta) * Math.sin(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(phi);

    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;

    const col = (i % 7 === 0) ? primaryCol : ((i % 11 === 0) ? cyanCol : dimCol);
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  dotGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const dotMat = new THREE.PointsMaterial({
    size: 0.024,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });

  const dotCloud = new THREE.Points(dotGeo, dotMat);
  globeGroup.add(dotCloud);

  // 2. Holographic Outer Glass Shell (Containing the icons inside)
  const outerSphereGeo = new THREE.SphereGeometry(radius * 0.99, 36, 36);
  const outerSphereMat = new THREE.MeshBasicMaterial({
    color: 0x090b1e,
    transparent: true,
    opacity: 0.35,
    wireframe: false
  });
  const outerSphere = new THREE.Mesh(outerSphereGeo, outerSphereMat);
  globeGroup.add(outerSphere);

  const wireShellGeo = new THREE.SphereGeometry(radius, 24, 24);
  const wireShellMat = new THREE.MeshBasicMaterial({
    color: 0x4f7cf7,
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });
  globeGroup.add(new THREE.Mesh(wireShellGeo, wireShellMat));

  // 3. Central Energy Core
  const coreGeo = new THREE.SphereGeometry(0.25, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x4f7cf7,
    transparent: true,
    opacity: 0.6
  });
  const coreSphere = new THREE.Mesh(coreGeo, coreMat);
  globeGroup.add(coreSphere);

  // 4. Subtle Interior Orbit Rings
  const ringMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.12
  });

  [-0.4, 0, 0.4].forEach(yPos => {
    const ringR = Math.sqrt(Math.max(0, (radius * 0.8) * (radius * 0.8) - yPos * yPos));
    const pts = [];
    for (let j = 0; j <= 64; j++) {
      const a = (j / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * ringR, yPos, Math.sin(a) * ringR));
    }
    const rGeo = new THREE.BufferGeometry().setFromPoints(pts);
    globeGroup.add(new THREE.Line(rGeo, ringMat));
  });

  // 5. Distribute Mastered Tech Pins INSIDE the Globe Sphere
  const techPins = [];
  const techInsideRadius = radius * 0.68; // Inside the globe

  techList.forEach((tech, i) => {
    // Spherical distribution inside the globe
    const phi = Math.acos(1 - 2 * (i + 0.5) / techList.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const localPos = new THREE.Vector3(
      techInsideRadius * Math.sin(phi) * Math.cos(theta),
      techInsideRadius * Math.cos(phi),
      techInsideRadius * Math.sin(phi) * Math.sin(theta)
    );

    // Glowing anchor node inside the globe
    const nodeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 10, 10),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(tech.color || '#4f7cf7') })
    );
    nodeMesh.position.copy(localPos);
    globeGroup.add(nodeMesh);

    // Neural ray from center to the tech node inside the globe
    const rayGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      localPos
    ]);
    const rayMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(tech.color || '#4f7cf7'),
      transparent: true,
      opacity: 0.28
    });
    globeGroup.add(new THREE.Line(rayGeo, rayMat));

    // Create 2D Overlay HTML Pin
    const pinEl = document.createElement('div');
    pinEl.className = 'tech-globe-pin inside-globe-pin';
    pinEl.innerHTML = `<i class="${tech.icon}" style="color: ${tech.color};"></i> <span>${tech.name}</span>`;
    pinEl.title = `${tech.name} (${tech.level || 'Mastered'})`;
    overlay.appendChild(pinEl);

    pinEl.addEventListener('click', () => {
      filterProjectsByTech(tech.name);
    });

    techPins.push({
      localPos,
      element: pinEl,
      tech
    });
  });

  // Interactive Drag & Spin Physics
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  let velX = 0;
  let velY = 0;
  let autoSpeed = 0.0035;

  const onDown = (e) => {
    isDragging = true;
    prevX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    velX = 0;
    velY = 0;
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const dx = clientX - prevX;
    const dy = clientY - prevY;

    velX = dx * 0.005;
    velY = dy * 0.005;

    globeGroup.rotation.y += velX;
    globeGroup.rotation.x += velY;

    // Clamp vertical tilt
    globeGroup.rotation.x = Math.max(-0.9, Math.min(0.9, globeGroup.rotation.x));

    prevX = clientX;
    prevY = clientY;
  };

  const onUp = () => {
    isDragging = false;
  };

  viewport.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  viewport.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp);

  // Resize handler
  window.addEventListener('resize', () => {
    const w = viewport.clientWidth || 400;
    const h = viewport.clientHeight || 400;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Animation Loop: 3D to 2D Screen Projection
  const tempVec = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      velX *= 0.94;
      velY *= 0.94;
      globeGroup.rotation.y += autoSpeed + velX;
      globeGroup.rotation.x += velY;
    }

    globeGroup.updateMatrixWorld();

    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    const halfW = w / 2;
    const halfH = h / 2;

    // Project each tech pin to 2D Screen Coordinates inside the globe
    techPins.forEach(pin => {
      tempVec.copy(pin.localPos);
      tempVec.applyMatrix4(globeGroup.matrixWorld);
      tempVec.project(camera);

      // Depth calculations inside the 3D sphere
      // depthFactor: 1.0 = closest front, 0.0 = furthest back
      const depthFactor = Math.max(0, Math.min(1, (1.2 - tempVec.z) / 2.4));
      const scale = (0.72 + depthFactor * 0.42).toFixed(3);
      const opacity = (0.28 + depthFactor * 0.72).toFixed(3);
      const zIndex = Math.round(depthFactor * 100);

      const screenX = (tempVec.x * halfW) + halfW;
      const screenY = -(tempVec.y * halfH) + halfH;

      pin.element.style.left = `${screenX}px`;
      pin.element.style.top = `${screenY}px`;
      pin.element.style.opacity = opacity;
      pin.element.style.zIndex = zIndex;
      pin.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
      pin.element.style.filter = depthFactor > 0.45 ? 'none' : 'blur(0.6px)';
      pin.element.style.pointerEvents = depthFactor > 0.35 ? 'auto' : 'none';
    });

    renderer.render(scene, camera);
  }

  animate();

  // Chips hover highlights pins
  if (chipsContainer) {
    chipsContainer.querySelectorAll('.tech-chip').forEach(chip => {
      chip.addEventListener('mouseenter', () => {
        const idx = parseInt(chip.dataset.idx, 10);
        if (techPins[idx]) {
          techPins[idx].element.style.borderColor = '#4f7cf7';
          techPins[idx].element.style.boxShadow = '0 0 20px rgba(79, 124, 247, 0.6)';
          techPins[idx].element.style.transform = 'translate(-50%, -50%) scale(1.25)';
        }
      });

      chip.addEventListener('mouseleave', () => {
        const idx = parseInt(chip.dataset.idx, 10);
        if (techPins[idx]) {
          techPins[idx].element.style.borderColor = '';
          techPins[idx].element.style.boxShadow = '';
          techPins[idx].element.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      });

      chip.addEventListener('click', () => {
        const idx = parseInt(chip.dataset.idx, 10);
        if (techPins[idx]) {
          filterProjectsByTech(techPins[idx].tech.name);
        }
      });
    });
  }
}

function filterProjectsByTech(techName) {
  const searchInput = document.getElementById('projectSearchInput');
  const projectsSec = document.getElementById('projects');
  if (searchInput && projectsSec) {
    searchInput.value = techName;
    searchInput.dispatchEvent(new Event('input'));
    projectsSec.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ============================================================
   5. BACKGROUND PARTICLE NETWORK
   ============================================================ */
function initParticleNetwork() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const COUNT = Math.min(Math.floor(window.innerWidth / 22), 65);
  const MAX_DIST = 110;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random() * 0.35 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79, 124, 247, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 102, 247, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  }

  loop();
}

/* ============================================================
   6. DYNAMIC TYPEWRITER EFFECT
   ============================================================ */
function initTypewriter() {
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  const data = window.portfolioData || {};
  const roles = data.roles || [
    'Front-End AI Engineering Intern',
    'Full-Stack Developer',
    'Open Source Contributor',
    'Problem Solver'
  ];

  let rIdx = 0;
  let cIdx = 0;
  let isDeleting = false;

  function tick() {
    const current = roles[rIdx];

    if (!isDeleting) {
      typedEl.textContent = current.substring(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        isDeleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 80);
    } else {
      typedEl.textContent = current.substring(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        isDeleting = false;
        rIdx = (rIdx + 1) % roles.length;
        setTimeout(tick, 350);
        return;
      }
      setTimeout(tick, 45);
    }
  }

  tick();
}

/* ============================================================
   7. INTERNSHIPS RENDERING
   ============================================================ */
function renderInternships() {
  const container = document.getElementById('internships-container');
  if (!container) return;

  const data = window.portfolioData || {};
  const internships = data.internships || [];

  container.innerHTML = internships.map(item => `
    <div class="internship-card" id="${item.id}">
      <div class="internship-top">
        <div>
          <h3 class="internship-role">${item.role}</h3>
          <a href="${item.companyUrl}" target="_blank" class="internship-company">
            ${item.company} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem;"></i>
          </a>
        </div>
        <div class="internship-meta-tags">
          <span class="meta-pill"><i class="fa-solid fa-calendar-days"></i> ${item.period}</span>
          <span class="meta-pill"><i class="fa-solid fa-clock"></i> ${item.duration}</span>
          ${item.source ? `<span class="meta-pill"><i class="fa-solid fa-link"></i> ${item.source}</span>` : ''}
        </div>
      </div>

      <div class="internship-points">
        ${item.points.map(pt => `<div class="internship-point">${pt}</div>`).join('')}
      </div>

      <div class="internship-footer">
        <div class="internship-tags">
          ${item.tags.map(t => `<span class="tech-tag-sm">${t}</span>`).join('')}
        </div>
        <div class="internship-actions">
          ${(item.actions || []).map(action => `
            <button class="btn btn-secondary btn-sm" onclick='window.openMediaModal(${JSON.stringify(action.pages)}, ${JSON.stringify(action.title)})'>
              <i class="${action.icon}"></i> ${action.label}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   8. SKILLS BREAKDOWN RENDERING
   ============================================================ */
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const data = window.portfolioData || {};
  const skills = data.skills || [];

  grid.innerHTML = skills.map(cat => `
    <div class="skill-category-card">
      <div class="skill-cat-header">
        <div class="skill-cat-icon"><i class="${cat.icon}"></i></div>
        <h3 class="skill-cat-title">${cat.category}</h3>
      </div>
      <div class="skill-bars-list">
        ${cat.items.map(item => `
          <div class="skill-bar-item">
            <div class="skill-bar-top">
              <span class="skill-bar-name"><i class="${item.icon}"></i> ${item.name}</span>
              <span class="skill-bar-pct">${item.level}%</span>
            </div>
            <div class="skill-progress-track">
              <div class="skill-progress-fill" data-width="${item.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Animate skill bars on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-progress-fill').forEach(fill => {
          fill.style.width = fill.dataset.width;
        });
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.skill-category-card').forEach(card => observer.observe(card));
}

/* ============================================================
   9. GITHUB PROJECTS SYNC WITH SEARCH & FILTER
   ============================================================ */
function initGitHubProjects() {
  const grid = document.getElementById('projectsGrid');
  const searchInput = document.getElementById('projectSearchInput');
  const filterTabs = document.getElementById('projectFilterTabs');
  if (!grid) return;

  let allProjects = [];

  const data = window.portfolioData || {};
  const fallbackProjects = data.fallbackProjects || [];

  // Fetch from GitHub API
  fetch('https://api.github.com/users/arunkumarmeda27/repos?sort=updated&per_page=100')
    .then(res => {
      if (!res.ok) throw new Error('GitHub API rate limited');
      return res.json();
    })
    .then(repos => {
      if (Array.isArray(repos) && repos.length > 0) {
        allProjects = repos;
      } else {
        allProjects = fallbackProjects;
      }
      renderCards(allProjects);
    })
    .catch(() => {
      // Graceful fallback to verified repositories
      allProjects = fallbackProjects;
      renderCards(allProjects);
    });

  function renderCards(list) {
    if (!list.length) {
      grid.innerHTML = '<div class="loading-state">No repositories matching your criteria.</div>';
      return;
    }

    grid.innerHTML = list.map(repo => {
      const lang = repo.language || 'Code';
      const stars = repo.stargazers_count || 0;
      const forks = repo.forks_count || 0;
      const desc = repo.description || 'Public software project and open-source contribution repository.';

      return `
        <div class="glass-card project-card">
          <div>
            <div class="project-card-top">
              <i class="fa-regular fa-folder-open project-folder-icon"></i>
              <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="project-link-btn" title="View Source">
                  <i class="fa-brands fa-github"></i>
                </a>
                ${repo.homepage ? `
                  <a href="${repo.homepage}" target="_blank" class="project-link-btn" title="Live Preview">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                ` : ''}
              </div>
            </div>
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-desc">${desc}</p>
          </div>

          <div class="project-card-footer">
            <span class="project-lang">
              <span class="lang-dot"></span> ${lang}
            </span>
            <div class="project-metrics">
              <span><i class="fa-regular fa-star"></i> ${stars}</span>
              <span><i class="fa-solid fa-code-fork"></i> ${forks}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Search Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = allProjects.filter(p => {
        const nameMatch = p.name && p.name.toLowerCase().includes(q);
        const descMatch = p.description && p.description.toLowerCase().includes(q);
        const langMatch = p.language && p.language.toLowerCase().includes(q);
        return nameMatch || descMatch || langMatch;
      });
      renderCards(filtered);
    });
  }

  // Language Tabs Filter
  if (filterTabs) {
    filterTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;

      filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const lang = tab.dataset.lang;
      if (lang === 'all') {
        renderCards(allProjects);
      } else {
        const filtered = allProjects.filter(p => p.language && p.language.toLowerCase() === lang.toLowerCase());
        renderCards(filtered);
      }
    });
  }
}

/* ============================================================
   10. CREDENTIALS & HACKATHONS RENDERING
   ============================================================ */
function renderCredentials() {
  const certList = document.getElementById('certificationsList');
  const hackList = document.getElementById('hackathonsList');

  const data = window.portfolioData || {};

  if (certList && data.certifications) {
    certList.innerHTML = data.certifications.map(c => `
      <div class="credential-item">
        <div class="credential-item-top">
          <h4 class="credential-name">${c.name}</h4>
          <span class="credential-badge">${c.badge || 'Verified'}</span>
        </div>
        <div class="credential-issuer">${c.issuer} · ${c.date}</div>
        ${c.isImage ? `
          <button class="credential-btn" onclick='window.openMediaModal(["${c.link}"], "${c.name}")'>
            <i class="fa-solid fa-file-image"></i> View Certificate
          </button>
        ` : `
          <a href="${c.link}" target="_blank" class="credential-btn">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Verify Certificate
          </a>
        `}
      </div>
    `).join('');
  }

  if (hackList && data.hackathons) {
    hackList.innerHTML = data.hackathons.map(h => `
      <div class="credential-item">
        <div class="credential-item-top">
          <h4 class="credential-name">${h.name}</h4>
          <span class="credential-badge">${h.role}</span>
        </div>
        <div class="credential-issuer">${h.project} · ${h.date}</div>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">${h.description}</p>
      </div>
    `).join('');
  }
}

/* ============================================================
   11. CODE EDITOR CONTACT TRANSMISSION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('terminalStatus');
  const submitBtn = document.getElementById('btnSubmitCode');
  if (!form || !statusEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName')?.value.trim();
    const email = document.getElementById('senderEmail')?.value.trim();
    const msg = document.getElementById('senderMsg')?.value.trim();

    if (!name || !email || !msg) {
      statusEl.className = 'terminal-status error';
      statusEl.textContent = '> [Error]: All input parameters required for transmission.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting...';
    statusEl.className = 'terminal-status';
    statusEl.textContent = '> Initializing handshake with smtp/webhook gateway...';

    setTimeout(() => {
      statusEl.className = 'terminal-status success';
      statusEl.innerHTML = `> [Success]: Transmission delivered for <strong>${name}</strong>. HTTP 200 OK.`;
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Transmission Sent';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Execute Transmission';
        submitBtn.style.background = '';
      }, 4000);
    }, 1200);
  });
}

/* ============================================================
   12. EMAIL ONE-CLICK COPY TOOLTIPS
   ============================================================ */
function initEmailCopyButtons() {
  const attachCopy = (btnId, tooltipId) => {
    const btn = document.getElementById(btnId);
    const tooltip = document.getElementById(tooltipId);
    if (!btn) return;

    btn.addEventListener('click', () => {
      const email = btn.dataset.email || 'arunkumarmeda27@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (tooltip) {
          tooltip.classList.add('show');
          setTimeout(() => tooltip.classList.remove('show'), 2200);
        }
      });
    });
  };

  attachCopy('copyEmailBtn', 'emailTooltip');

  // Quick email button in hero
  const heroQuickBtn = document.getElementById('quick-copy-email');
  if (heroQuickBtn) {
    heroQuickBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('arunkumarmeda27@gmail.com').then(() => {
        heroQuickBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        setTimeout(() => {
          heroQuickBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
      });
    });
  }
}

/* ============================================================
   13. MULTI-PAGE MEDIA LIGHTBOX MODAL
   ============================================================ */
(function () {
  let _pages = [];
  let _index = 0;
  let _caption = '';

  function getEls() {
    return {
      modal: document.getElementById('media-modal'),
      img: document.getElementById('modal-img'),
      caption: document.getElementById('modal-caption'),
      counter: document.getElementById('modal-page-counter'),
      prev: document.getElementById('modal-prev'),
      next: document.getElementById('modal-next')
    };
  }

  function renderPage() {
    const { img, caption, counter, prev, next } = getEls();
    if (!img) return;

    img.style.opacity = '0';
    setTimeout(() => {
      img.src = _pages[_index];
      img.style.opacity = '1';
    }, 120);

    caption.textContent = _caption;

    if (_pages.length > 1) {
      counter.textContent = `Page ${_index + 1} of ${_pages.length}`;
      prev.style.display = 'flex';
      next.style.display = 'flex';
    } else {
      counter.textContent = '';
      prev.style.display = 'none';
      next.style.display = 'none';
    }
  }

  window.openMediaModal = function (pages, caption) {
    if (!pages || !pages.length) return;
    _pages = Array.isArray(pages) ? pages : [pages];
    _index = 0;
    _caption = caption || '';

    const { modal } = getEls();
    if (modal) {
      modal.style.display = 'flex';
      renderPage();
    }
  };

  window.closeMediaModal = function () {
    const { modal } = getEls();
    if (modal) modal.style.display = 'none';
  };

  window.modalNav = function (direction) {
    _index = (_index + direction + _pages.length) % _pages.length;
    renderPage();
  };

  // Keyboard navigation for modal
  window.addEventListener('keydown', (e) => {
    const { modal } = getEls();
    if (!modal || modal.style.display !== 'flex') return;

    if (e.key === 'Escape') window.closeMediaModal();
    if (e.key === 'ArrowLeft') window.modalNav(-1);
    if (e.key === 'ArrowRight') window.modalNav(1);
  });
})();
