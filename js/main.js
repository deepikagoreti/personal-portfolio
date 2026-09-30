/**
 * Main Controller - Modern Bento Grid & Minimalist UI
 * Clean, structured, accessible, and fast.
 */

class PortfolioApp {
  constructor() {
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    this.themeIcon = document.getElementById("themeIcon");
    this.themeText = document.getElementById("themeText");
    this.backToTopBtn = document.getElementById("backToTopBtn");
    this.projectContainer = document.getElementById("projectsContainer");
    this.projectFilterButtons = document.querySelectorAll(".filter-tab-btn");
    this.projectSearchInput = document.getElementById("projectSearchInput");
    this.modalEl = document.getElementById("projectDetailModal");
    this.projectModal = this.modalEl && typeof bootstrap !== "undefined" ? new bootstrap.Modal(this.modalEl) : null;

    this.activeFilter = "all";
    this.searchQuery = "";

    this.init();
  }

  init() {
    this.initTheme();
    this.renderSkills();
    this.renderProjects();
    this.renderEducation();
    this.renderCertifications();
    this.initProjectFilterAndSearch();
    this.initStatsCounter();
    this.initBackToTop();
  }

  /* -------------------------------------------------------------
   * 1. THEME SWITCHER
   * ------------------------------------------------------------- */
  initTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? "dark" : "light");

    this.setTheme(initialTheme);

    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme") || "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        this.setTheme(newTheme);
      });
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    if (this.themeIcon) {
      if (theme === "dark") {
        this.themeIcon.className = "fa-solid fa-sun text-warning";
        if (this.themeText) this.themeText.textContent = "Light";
      } else {
        this.themeIcon.className = "fa-solid fa-moon text-primary";
        if (this.themeText) this.themeText.textContent = "Dark";
      }
    }
  }

  /* -------------------------------------------------------------
   * 2. RENDER SKILLS
   * ------------------------------------------------------------- */
  renderSkills() {
    const skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer || !window.portfolioData?.skills) return;

    const { html: htmlSkills, css: cssSkills, bootstrap: bsSkills, js: jsSkills } = window.portfolioData.skills;
    const skillCategories = [
      { id: "html", title: "HTML5 Fundamentals", icon: "fa-brands fa-html5", skills: htmlSkills || [] },
      { id: "css", title: "CSS3 Styling", icon: "fa-brands fa-css3-alt", skills: cssSkills || [] },
      { id: "bootstrap", title: "Bootstrap 5", icon: "fa-brands fa-bootstrap", skills: bsSkills || [] },
      { id: "js", title: "JavaScript ES6+", icon: "fa-brands fa-js", skills: jsSkills || [] }
    ];

    const renderedHtml = skillCategories.map(cat => {
      const itemsHtml = cat.skills.map(skill => `
        <div class="skill-row">
          <div class="d-flex justify-content-between align-items-center small">
            <span class="fw-semibold d-flex align-items-center">
              <i class="${skill.icon} me-2" style="color: ${skill.color};"></i> ${skill.name}
            </span>
            <span class="text-secondary fw-bold">${skill.level}%</span>
          </div>
          <div class="skill-track-bar">
            <div 
              class="skill-fill-progress" 
              style="width: 0%; background-color: ${skill.color};" 
              data-level="${skill.level}"
              aria-valuenow="${skill.level}">
            </div>
          </div>
        </div>
      `).join("");

      return `
        <div class="col-12 col-md-6 col-lg-3">
          <div class="skill-card-clean">
            <div class="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
              <div class="p-2 rounded-3 bg-primary-subtle text-primary">
                <i class="${cat.icon} fs-5"></i>
              </div>
              <h3 class="h6 fw-bold mb-0">${cat.title}</h3>
            </div>
            <div class="pt-1">
              ${itemsHtml}
            </div>
          </div>
        </div>
      `;
    }).join("");

    skillsContainer.innerHTML = renderedHtml;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressFills = entry.target.querySelectorAll(".skill-fill-progress");
          progressFills.forEach(fill => {
            const level = fill.getAttribute("data-level");
            fill.style.width = `${level}%`;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsContainer);
  }

  /* -------------------------------------------------------------
   * 4. RENDER & FILTER PROJECTS
   * ------------------------------------------------------------- */
  renderProjects() {
    if (!this.projectContainer || !window.portfolioData?.projects) return;

    let filtered = window.portfolioData.projects;

    if (this.activeFilter !== "all") {
      filtered = filtered.filter(p => p.category === this.activeFilter);
    }

    if (this.searchQuery.trim() !== "") {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      this.projectContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fa-solid fa-magnifying-glass fs-1 text-secondary mb-3"></i>
          <h4 class="fw-bold">No Projects Found</h4>
          <p class="text-secondary small">Try adjusting your filter or search keywords.</p>
          <button class="btn btn-outline-primary btn-sm rounded-pill mt-2" id="clearProjectFilterBtn">Reset Filters</button>
        </div>
      `;
      const clearBtn = document.getElementById("clearProjectFilterBtn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          this.activeFilter = "all";
          this.searchQuery = "";
          if (this.projectSearchInput) this.projectSearchInput.value = "";
          this.projectFilterButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.filter === "all"));
          this.renderProjects();
        });
      }
      return;
    }

    const html = filtered.map(project => {
      const techChips = project.technologies.map(t => `
        <span class="tech-tag-chip">${t}</span>
      `).join("");

      return `
        <div class="col-12 col-md-6 col-lg-6">
          <div class="project-card-modern">
            <div class="project-img-box">
              <img src="${project.image}" class="project-img-display" alt="${project.title}" loading="lazy">
              <span class="badge bg-dark bg-opacity-75 text-white position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill small">
                ${project.badge || project.categoryName}
              </span>
            </div>
            <div class="p-4 d-flex flex-column flex-grow-1">
              <h3 class="h5 fw-bold mb-2">${project.title}</h3>
              <p class="text-secondary small mb-3 flex-grow-1" style="line-height: 1.6;">${project.shortDesc}</p>
              
              <div class="mb-3 d-flex flex-wrap">
                ${techChips}
              </div>

              <div class="d-flex align-items-center gap-2 pt-3 border-top mt-auto">
                <button class="btn btn-primary btn-sm rounded-pill flex-grow-1 view-project-btn" data-project-id="${project.id}">
                  <i class="fa-solid fa-circle-info me-1"></i> View Details
                </button>
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary btn-sm rounded-circle" style="width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;" title="Live Demo">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary btn-sm rounded-circle" style="width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;" title="Source Code">
                  <i class="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    this.projectContainer.innerHTML = html;

    const detailButtons = this.projectContainer.querySelectorAll(".view-project-btn");
    detailButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const pId = e.currentTarget.getAttribute("data-project-id");
        this.openProjectModal(pId);
      });
    });
  }

  initProjectFilterAndSearch() {
    this.projectFilterButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.projectFilterButtons.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.activeFilter = e.currentTarget.getAttribute("data-filter");
        this.renderProjects();
      });
    });

    if (this.projectSearchInput) {
      this.projectSearchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderProjects();
      });
    }
  }

  openProjectModal(projectId) {
    const project = window.portfolioData?.projects.find(p => p.id === projectId);
    if (!project) return;

    const modalTitle = document.getElementById("modalProjectTitle");
    const modalImage = document.getElementById("modalProjectImage");
    const modalDesc = document.getElementById("modalProjectDesc");
    const modalFeaturesList = document.getElementById("modalProjectFeatures");
    const modalTechBadges = document.getElementById("modalProjectTech");
    const modalLiveLink = document.getElementById("modalProjectLive");
    const modalGithubLink = document.getElementById("modalProjectGithub");

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalImage) {
      modalImage.src = project.image;
      modalImage.alt = project.title;
    }
    if (modalDesc) modalDesc.textContent = project.fullDesc;

    if (modalFeaturesList) {
      modalFeaturesList.innerHTML = project.features.map(f => `
        <li class="mb-2 d-flex align-items-start">
          <i class="fa-solid fa-circle-check text-success me-2 mt-1"></i>
          <span>${f}</span>
        </li>
      `).join("");
    }

    if (modalTechBadges) {
      modalTechBadges.innerHTML = project.technologies.map(t => `
        <span class="tech-tag-chip me-1 mb-1">${t}</span>
      `).join("");
    }

    if (modalLiveLink) modalLiveLink.href = project.liveUrl;
    if (modalGithubLink) modalGithubLink.href = project.githubUrl;

    if (this.projectModal) {
      this.projectModal.show();
    }
  }

  /* -------------------------------------------------------------
   * 5. RENDER EDUCATION
   * ------------------------------------------------------------- */
  renderEducation() {
    const eduCardsContainer = document.getElementById("educationCardsContainer");
    const eduTbody = document.getElementById("educationTableBody");
    if (!window.portfolioData?.education) return;

    if (eduCardsContainer) {
      const cardsHtml = window.portfolioData.education.map(edu => `
        <div class="col-12 col-lg-4">
          <div class="edu-card-item">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="edu-year-chip">${edu.period}</span>
              <span class="edu-score-chip">${edu.score}</span>
            </div>
            <h4 class="h6 fw-bold mb-1">${edu.degree}</h4>
            <p class="text-primary small fw-semibold mb-2">${edu.institution}</p>
            <p class="text-secondary small mb-0" style="line-height: 1.5;">${edu.details}</p>
          </div>
        </div>
      `).join("");
      eduCardsContainer.innerHTML = cardsHtml;
    }

    if (eduTbody) {
      const tableHtml = window.portfolioData.education.map(edu => `
        <tr>
          <td class="fw-bold">
            <div class="d-flex align-items-center">
              <i class="fa-solid fa-graduation-cap text-primary me-2"></i>
              <div>
                <span>${edu.degree}</span>
                <div class="text-secondary small fw-normal">${edu.institution}</div>
              </div>
            </div>
          </td>
          <td><span class="edu-year-chip">${edu.period}</span></td>
          <td><strong class="text-success">${edu.score}</strong></td>
          <td class="small text-secondary">${edu.details}</td>
        </tr>
      `).join("");
      eduTbody.innerHTML = tableHtml;
    }
  }

  /* -------------------------------------------------------------
   * 6. RENDER CERTIFICATIONS
   * ------------------------------------------------------------- */
  renderCertifications() {
    const certsContainer = document.getElementById("certsContainer");
    if (!certsContainer || !window.portfolioData?.certifications) return;

    const certsHtml = window.portfolioData.certifications.map(cert => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="cert-card-box">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="tech-tag-chip">${cert.badge}</span>
            <i class="fa-solid fa-award text-warning fs-5"></i>
          </div>
          <h4 class="h6 fw-bold mb-1">${cert.title}</h4>
          <p class="text-secondary small mb-3"><i class="fa-solid fa-building me-1"></i> ${cert.issuer}</p>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top small text-secondary">
            <span><i class="fa-regular fa-calendar me-1"></i> ${cert.date}</span>
            <span class="badge bg-body-secondary text-body font-monospace">${cert.id}</span>
          </div>
        </div>
      </div>
    `).join("");

    certsContainer.innerHTML = certsHtml;
  }

  /* -------------------------------------------------------------
   * 7. ANIMATED METRICS STRIP
   * ------------------------------------------------------------- */
  initStatsCounter() {
    const statsContainer = document.getElementById("statsCounterContainer");
    if (!statsContainer || !window.portfolioData?.stats) return;

    const statsHtml = window.portfolioData.stats.map(stat => `
      <div class="col-6 col-md-3">
        <div class="metric-unit">
          <div class="metric-val">
            <span class="stat-number" data-target="${stat.value}" data-decimal="${!!stat.isDecimal}">0</span>${stat.suffix}
          </div>
          <p class="metric-desc">${stat.label}</p>
        </div>
      </div>
    `).join("");

    statsContainer.innerHTML = `
      <div class="row g-3">
        ${statsHtml}
      </div>
    `;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat-number");
          counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute("data-target"));
            const isDecimal = counter.getAttribute("data-decimal") === "true";
            const duration = 1500;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const currentVal = progress * target;

              counter.textContent = isDecimal ? currentVal.toFixed(2) : Math.floor(currentVal);

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                counter.textContent = isDecimal ? target.toFixed(2) : target;
              }
            };

            requestAnimationFrame(updateCount);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsContainer);
  }

  /* -------------------------------------------------------------
   * 8. BACK TO TOP
   * ------------------------------------------------------------- */
  initBackToTop() {
    if (!this.backToTopBtn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        this.backToTopBtn.classList.add("show");
      } else {
        this.backToTopBtn.classList.remove("show");
      }
    });

    this.backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});
