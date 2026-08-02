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


  // --- 2. Floating Navbar & Mobile Menu System ---
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Create backdrop element if it doesn't exist
  let navBackdrop = document.querySelector('.nav-backdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('active');
    
    if (isOpen) {
      // Show menu: set display:flex first, then animate transform on next frame
      if (navMenu) {
        navMenu.style.display = 'flex';
        // Force reflow so the browser registers display:flex before animating
        navMenu.offsetHeight;
        navMenu.classList.add('active');
      }
      if (navToggle) {
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
      }
      navBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      // Close menu: animate transform first, then hide after transition
      if (navMenu) navMenu.classList.remove('active');
      if (navToggle) {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
      navBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Wait for the slide-out transition to finish, then set display:none
      if (navMenu) {
        const onTransitionEnd = () => {
          if (!navMenu.classList.contains('active')) {
            navMenu.style.display = 'none';
          }
          navMenu.removeEventListener('transitionend', onTransitionEnd);
        };
        navMenu.addEventListener('transitionend', onTransitionEnd);
      }
    }
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    navBackdrop.addEventListener('click', () => {
      toggleMobileMenu(false);
    });

    // Close menu on Escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu(false);
      }
    });
  }

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

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
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

  // --- 6. Fetch Profile Picture from LinkedIn (with GitHub fallback) ---
  function fetchProfilePicture() {
    const avatarEl = document.getElementById('github-avatar');
    if (!avatarEl) return;

    // Direct dynamic link to LinkedIn Profile Picture via unavatar.io
    const linkedinAvatarUrl = 'https://unavatar.io/linkedin/arun-kumar-meda-557b051b8';
    
    avatarEl.src = linkedinAvatarUrl;
    avatarEl.style.display = 'block';

    // If LinkedIn avatar fails to load, fallback to GitHub avatar
    avatarEl.onerror = () => {
      console.log('LinkedIn avatar failed to load, falling back to GitHub avatar...');
      avatarEl.onerror = null; // Prevent infinite loop if fallback also fails
      fetch('https://api.github.com/users/arunkumarmeda27')
        .then(res => res.json())
        .then(data => {
          if (data.avatar_url) {
            avatarEl.src = data.avatar_url;
          }
        })
        .catch(err => console.error('Error loading fallback avatar:', err));
    };
  }

  // --- 7. Fetch GitHub Repositories Dynamically ---
  function fetchGitHubRepositories() {
    const projectsGrid = document.getElementById('github-projects-grid');
    if (!projectsGrid) return;

    fetch('https://api.github.com/users/arunkumarmeda27/repos?sort=updated&per_page=100')
      .then(res => res.json())
      .then(repos => {
        if (!Array.isArray(repos)) {
          projectsGrid.innerHTML = '<div class="error">Failed to load projects from GitHub.</div>';
          return;
        }

        // Clean out loading spinner
        projectsGrid.innerHTML = '';

        // Display all repositories
        repos.forEach(repo => {
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

  // --- 8. Load Certifications and Hackathons from data.js ---
  function loadCredentials() {
    const certsList = document.getElementById('certifications-list');
    const hacksList = document.getElementById('hackathons-list');

    if (!certsList || !hacksList) return;

    const data = window.portfolioData;
    if (!data) {
      console.error('Error: window.portfolioData is not defined.');
      return;
    }

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
  }

  // --- 10. Circular Skill Ring Progress Animation ---
  function animateCircularSkills() {
    const circles = document.querySelectorAll('.progress-ring-circle');
    circles.forEach(circle => {
      const parent = circle.closest('.circular-skill');
      if (!parent) return;
      const percent = parseInt(parent.getAttribute('data-percent'), 10) || 0;
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    });
  }

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCircularSkills();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
  }

  // --- 11. Hero Code Editor Tab Switcher ---
  const tabBtns = document.querySelectorAll('.editor-tab');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });

      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) {
        activeContent.style.display = 'block';
        activeContent.classList.add('active');
      }
    });
  });

  // --- 12. Real-Time Project Search & Category Filter ---
  const searchInput = document.getElementById('project-search');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function filterProjects() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const filterCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.project-desc')?.textContent.toLowerCase() || '';
      const tech = card.querySelector('.project-tech')?.textContent.toLowerCase() || '';
      const cardCategory = card.getAttribute('data-category') || 'web';

      const matchesSearch = !query || title.includes(query) || desc.includes(query) || tech.includes(query);
      const matchesCategory = filterCategory === 'all' || cardCategory === filterCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0';
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects();
    });
  });

  // --- 13. IDE Contact Form Submission ---
  const contactForm = document.getElementById('contact-form');
  const terminalStatus = document.getElementById('terminal-status');

  if (contactForm && terminalStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('sender-name').value;
      const senderEmail = document.getElementById('sender-email').value;
      const senderMsg = document.getElementById('sender-message').value;

      terminalStatus.classList.add('active');
      terminalStatus.innerHTML = `<span style="color: var(--secondary);">&gt;</span> Initiating transmission for <strong>${senderName}</strong>...`;

      setTimeout(() => {
        terminalStatus.innerHTML = `<span style="color: var(--primary);"><i class="fa-solid fa-circle-check"></i> Transmission ready!</span> Opening mail client...`;
        
        const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName}`);
        const body = encodeURIComponent(`Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${senderMsg}`);
        
        setTimeout(() => {
          window.location.href = `mailto:medaarun390@gmail.com?subject=${subject}&body=${body}`;
        }, 1000);
      }, 1000);
    });
  }

  // Run initial data loaders
  fetchProfilePicture();
  fetchGitHubRepositories();
  loadCredentials();
});

// --- 9. Multi-Page Lightbox Modal System for Internship Documents ---
(function () {
  let _pages  = [];   // Array of image src strings
  let _index  = 0;    // Current page index
  let _caption = '';  // Document title

  function getEls() {
    return {
      modal:   document.getElementById('media-modal'),
      img:     document.getElementById('modal-img'),
      caption: document.getElementById('modal-caption'),
      counter: document.getElementById('modal-page-counter'),
      prev:    document.getElementById('modal-prev'),
      next:    document.getElementById('modal-next'),
    };
  }

  function renderPage() {
    const { img, caption, counter, prev, next } = getEls();
    if (!img) return;

    // Fade out → swap src → fade in
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = _pages[_index];
      img.style.opacity = '1';
    }, 150);

    caption.textContent = _caption;

    // Page counter — hide when only 1 page
    if (_pages.length > 1) {
      counter.textContent = `Page ${_index + 1} of ${_pages.length}`;
      counter.style.display = 'block';
    } else {
      counter.style.display = 'none';
    }

    // Arrow visibility
    prev.style.display = (_pages.length > 1 && _index > 0) ? 'flex' : 'none';
    next.style.display = (_pages.length > 1 && _index < _pages.length - 1) ? 'flex' : 'none';
  }

  // Public: open modal — accepts single string OR array of strings
  window.openMediaModal = function (src, captionText) {
    _pages   = Array.isArray(src) ? src : [src];
    _index   = 0;
    _caption = captionText || '';

    const { modal } = getEls();
    if (!modal) return;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderPage();
    setTimeout(() => modal.classList.add('show'), 10);
  };

  // Public: navigate pages (-1 = prev, +1 = next)
  window.modalNav = function (dir) {
    const newIdx = _index + dir;
    if (newIdx >= 0 && newIdx < _pages.length) {
      _index = newIdx;
      renderPage();
    }
  };

  // Public: close modal
  window.closeMediaModal = function () {
    const { modal } = getEls();
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  };

  // Keyboard support: ← → arrows, Escape
  document.addEventListener('keydown', (e) => {
    const { modal } = getEls();
    if (!modal || modal.style.display === 'none') return;
    if (e.key === 'ArrowLeft')  window.modalNav(-1);
    if (e.key === 'ArrowRight') window.modalNav(1);
    if (e.key === 'Escape')     window.closeMediaModal();
  });
})();
