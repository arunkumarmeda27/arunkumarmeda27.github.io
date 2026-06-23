// Interactive Developer Portfolio JavaScript System

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Typing Subtitle Animation ---
  const words = ["Open Source", "Web Applications", "Modern Software", "Clean Code"];
  const textEl = document.getElementById('animated-text');
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeText() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      textEl.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      textEl.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 500; // Brief pause before typing next word
    }

    setTimeout(typeText, typeSpeed);
  }

  typeText();


  // --- 2. Floating Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // --- 3. Scroll Active Link Highlighting ---
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });


  // --- 4. Interactive Canvas Particle Background ---
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  
  let particlesArray = [];
  const numberOfParticles = 65;

  // Set canvas bounds
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Particle Blueprint
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.color = Math.random() > 0.5 ? '#10b981' : '#3b82f6';
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around canvas bounds
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;

      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
    }
  }

  // Populate particles
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  // Draw connections between close particles
  function connectParticles() {
    ctx.globalAlpha = 0.05;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();


  // --- 5. Copy Email To Clipboard Utility ---
  const copyBtn = document.getElementById('copy-email-btn');
  const tooltip = document.getElementById('email-tooltip');

  if (copyBtn && tooltip) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email');
      
      navigator.clipboard.writeText(email).then(() => {
        tooltip.classList.add('show');
        setTimeout(() => {
          tooltip.classList.remove('show');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // --- 6. Fetch GitHub Profile Picture ---
  function fetchGitHubProfile() {
    fetch('https://api.github.com/users/arunkumarmeda27')
      .then(res => res.json())
      .then(data => {
        const avatarEl = document.getElementById('github-avatar');
        if (avatarEl && data.avatar_url) {
          avatarEl.src = data.avatar_url;
          avatarEl.style.display = 'block';
        }
      })
      .catch(err => console.error('Error fetching GitHub profile:', err));
  }

  // --- 7. Fetch GitHub Repositories Dynamically ---
  function fetchGitHubRepositories() {
    const projectsGrid = document.getElementById('github-projects-grid');
    if (!projectsGrid) return;

    fetch('https://api.github.com/users/arunkumarmeda27/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(repos => {
        if (!Array.isArray(repos)) {
          projectsGrid.innerHTML = '<div class="error">Failed to load projects from GitHub.</div>';
          return;
        }

        // Clean out loading spinner
        projectsGrid.innerHTML = '';

        // Display up to 6 repositories
        const displayRepos = repos.slice(0, 6);

        displayRepos.forEach(repo => {
          const card = document.createElement('div');
          card.className = 'card project-card';
          
          const starBadge = repo.stargazers_count > 0 
            ? `<span class="project-badge"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>`
            : `<span class="project-badge active-project">${repo.language || 'Code'}</span>`;

          card.innerHTML = `
            <div class="project-header">
              <span class="project-icon"><i class="fa-solid fa-folder-open"></i></span>
              ${starBadge}
            </div>
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-desc">${repo.description || 'No description provided. Click the link below to explore the codebase.'}</p>
            <div class="project-tech">
              <span>${repo.language || 'HTML/CSS/JS'}</span>
              <span>Stars: ${repo.stargazers_count}</span>
            </div>
            <div class="project-links">
              <a href="${repo.html_url}" target="_blank" class="project-link">Explore Repo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          `;
          projectsGrid.appendChild(card);
        });
      })
      .catch(err => {
        console.error('Error fetching GitHub repos:', err);
        projectsGrid.innerHTML = '<div class="error">Error loading repositories. Please try again later.</div>';
      });
  }

  // --- 8. Load Certifications and Hackathons from data.json ---
  function loadCredentials() {
    const certsList = document.getElementById('certifications-list');
    const hacksList = document.getElementById('hackathons-list');

    if (!certsList || !hacksList) return;

    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        // Render Certifications
        if (data.certifications && data.certifications.length > 0) {
          certsList.innerHTML = '';
          data.certifications.forEach(cert => {
            const item = document.createElement('div');
            item.className = 'credential-item';
            item.innerHTML = `
              <a href="${cert.link}" target="_blank" class="credential-name">${cert.name}</a>
              <div class="credential-meta">
                <span><i class="fa-solid fa-building"></i> ${cert.issuer}</span>
                <span><i class="fa-solid fa-calendar-days"></i> ${cert.date}</span>
              </div>
            `;
            certsList.appendChild(item);
          });
        }

        // Render Hackathons
        if (data.hackathons && data.hackathons.length > 0) {
          hacksList.innerHTML = '';
          data.hackathons.forEach(hack => {
            const item = document.createElement('div');
            item.className = 'credential-item';
            item.innerHTML = `
              <div class="credential-name">${hack.name}</div>
              <div class="credential-meta">
                <span><i class="fa-solid fa-laptop-code"></i> Project: ${hack.project}</span>
                <span><i class="fa-solid fa-calendar-days"></i> ${hack.date}</span>
              </div>
              ${hack.description ? `<p class="credential-desc" style="margin-top: 0.5rem; font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">${hack.description}</p>` : ''}
            `;
            hacksList.appendChild(item);
          });
        }
      })
      .catch(err => console.error('Error loading credentials from data.json:', err));
  }

  // Run initial data loaders
  fetchGitHubProfile();
  fetchGitHubRepositories();
  loadCredentials();
});
