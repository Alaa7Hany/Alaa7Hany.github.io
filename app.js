/**
 * Portfolio Application Controller
 * Handles Pip-Boy theme switching (Dark/Light), project filtering,
 * top 3 initial project display with expandable toggle, architecture deep-dive modal,
 * gallery carousel, and async contact form handling.
 */

let isProjectsExpanded = false;
let currentCategoryFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCursorGlow();
  initNavbarScroll();
  initCategoryFilters();
  renderProjectCards();
});

/* --------------------------------------------------------------------------
   1. Dual Theme System (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
  updateThemeToggleIcon(newTheme);
}

function updateThemeToggleIcon(theme) {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.textContent = theme === "dark" ? "☀️" : "🌙";
  btn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
}

/* --------------------------------------------------------------------------
   2. Cursor Ambient Light Glow
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const cursorGlow = document.getElementById("cursorGlow");
  if (!cursorGlow) return;

  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

/* --------------------------------------------------------------------------
   3. Navbar Scroll Spy & Sticky Highlight
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Category Filtering & Top 3 / Show All Logic
   -------------------------------------------------------------------------- */
function initCategoryFilters() {
  const filterTabs = document.getElementById("filterTabs");
  if (!filterTabs) return;

  const tabButtons = filterTabs.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategoryFilter = btn.getAttribute("data-filter");
      // Reset expansion when switching to "all", but show all when filtering by specific category
      if (currentCategoryFilter !== "all") {
        isProjectsExpanded = true;
      }
      renderProjectCards();
    });
  });
}

function toggleAllProjects() {
  isProjectsExpanded = !isProjectsExpanded;
  renderProjectCards();
}

/* --------------------------------------------------------------------------
   5. Render Project Cards Grid (Top 3 Initially with Toggle)
   -------------------------------------------------------------------------- */
function renderProjectCards() {
  const grid = document.getElementById("projectsGrid");
  const showMoreWrap = document.getElementById("showMoreProjectsWrap");
  const btnToggle = document.getElementById("btnToggleAllProjects");

  if (!grid || typeof PROJECTS_DATA === "undefined") return;

  grid.innerHTML = "";

  // 1. Filter by category
  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    if (currentCategoryFilter === "all") return true;
    return proj.category === currentCategoryFilter;
  });

  if (filteredProjects.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p>No projects found for this category.</p>
      </div>
    `;
    if (showMoreWrap) showMoreWrap.style.display = "none";
    return;
  }

  // 2. Decide how many to display
  let displayedProjects = filteredProjects;
  if (currentCategoryFilter === "all" && !isProjectsExpanded) {
    displayedProjects = filteredProjects.slice(0, 3);
  }

  // 3. Update Toggle Button UI
  if (showMoreWrap && btnToggle) {
    if (currentCategoryFilter === "all" && filteredProjects.length > 3) {
      showMoreWrap.style.display = "flex";
      if (isProjectsExpanded) {
        btnToggle.innerHTML = `<span>Show Less (Top 3)</span><span>↑</span>`;
      } else {
        btnToggle.innerHTML = `<span>Show All Projects (${filteredProjects.length})</span><span>↓</span>`;
      }
    } else {
      showMoreWrap.style.display = "none";
    }
  }

  // 4. Render Cards
  displayedProjects.forEach((proj) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const badgeText = proj.category.toUpperCase();

    let previewHtml = "";
    if (proj.coverImage) {
      previewHtml = `
        <div class="project-preview">
          <img src="${proj.coverImage}" alt="${proj.title}" loading="lazy" />
          <span class="project-badge-corner">${badgeText}</span>
        </div>
      `;
    } else {
      const categoryIcon =
        proj.category === "android"
          ? "🤖"
          : proj.category === "flutter"
          ? "🌐"
          : proj.category === "ios"
          ? "🍎"
          : "⚙️";
      previewHtml = `
        <div class="project-preview">
          <div class="project-dynamic-banner">
            <span class="project-dynamic-icon">${categoryIcon}</span>
            <span style="font-family: var(--font-display); font-weight: 700; color: var(--text-main); font-size: 1.05rem;">${proj.title}</span>
          </div>
          <span class="project-badge-corner">${badgeText}</span>
        </div>
      `;
    }

    const techTagsHtml = proj.techStack
      .slice(0, 5)
      .map((tech) => `<span class="tech-tag">${tech}</span>`)
      .join("");

    card.innerHTML = `
      ${previewHtml}
      <div class="project-body">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-tagline">${proj.tagline}</p>
        <div class="project-tech-list">
          ${techTagsHtml}
          ${
            proj.techStack.length > 5
              ? `<span class="tech-tag">+${proj.techStack.length - 5}</span>`
              : ""
          }
        </div>
        <div class="project-card-footer">
          <a href="${
            proj.githubUrl
          }" target="_blank" rel="noopener" class="btn-card-action btn-repo">
            <span>GitHub</span>
            <span>↗</span>
          </a>
          <button type="button" class="btn-card-action btn-deep-dive" onclick="openProjectModal('${
            proj.id
          }')">
            <span>Deep Dive</span>
            <span>🔍</span>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   6. Architecture Deep-Dive Modal Logic
   -------------------------------------------------------------------------- */
function openProjectModal(projectId) {
  if (typeof PROJECTS_DATA === "undefined") return;
  const proj = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalTagline = document.getElementById("modalTagline");
  const modalContent = document.getElementById("modalContent");

  modalTitle.textContent = proj.title;
  modalTagline.textContent = proj.tagline;

  // Video Embed
  let videoEmbedHtml = "";
  if (proj.youtubeUrl && proj.youtubeUrl.trim() !== "") {
    const videoId = extractYouTubeId(proj.youtubeUrl);
    if (videoId) {
      videoEmbedHtml = `
        <div class="modal-video-wrapper">
          <iframe 
            src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" 
            title="${proj.title} Demo" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `;
    }
  }

  // Image Gallery
  let galleryHtml = "";
  if (proj.gallery && proj.gallery.length > 0) {
    const thumbsHtml = proj.gallery
      .map(
        (src, idx) => `
        <img 
          src="${src}" 
          alt="Screenshot ${idx + 1}" 
          class="modal-thumb ${idx === 0 ? "active" : ""}" 
          onclick="switchModalGallerySlide('${src}', this)" 
        />
      `
      )
      .join("");

    galleryHtml = `
      <div class="modal-gallery-container">
        <div class="modal-gallery-main">
          <img id="modalMainImg" src="${proj.gallery[0]}" alt="${proj.title} Showcase" />
        </div>
        ${
          proj.gallery.length > 1
            ? `<div class="modal-thumbs-row">${thumbsHtml}</div>`
            : ""
        }
      </div>
    `;
  }

  // Highlights
  const highlightsHtml = proj.highlights
    .map((h) => `<li style="margin-bottom: 0.4rem;">${h}</li>`)
    .join("");

  // Tech Chips
  const techChipsHtml = proj.techStack
    .map(
      (t) => `
      <span style="background: var(--bg-tag); border: 1px solid var(--border-glass); padding: 0.25rem 0.65rem; border-radius: 0.4rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-green);">
        ${t}
      </span>
    `
    )
    .join("");

  modalContent.innerHTML = `
    ${videoEmbedHtml}
    ${galleryHtml}

    <div style="margin-bottom: 1.35rem;">
      <h4 style="font-size: 1.02rem; color: var(--accent-green); margin-bottom: 0.35rem;">Overview & Problem Solved</h4>
      <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">${
        proj.summary
      }</p>
    </div>

    <div style="margin-bottom: 1.35rem;">
      <h4 style="font-size: 1.02rem; color: var(--accent-gold); margin-bottom: 0.35rem;">Key Engineering Highlights</h4>
      <ul style="list-style: disc; padding-left: 1.15rem; color: var(--text-muted); font-size: 0.9rem; line-height: 1.55;">
        ${highlightsHtml}
      </ul>
    </div>

    <div style="background: var(--bg-glass); border: 1px solid var(--border-glass); border-radius: 0.85rem; padding: 1.15rem; margin-bottom: 1.35rem;">
      <h4 style="font-size: 1.02rem; color: var(--accent-green); margin-bottom: 0.55rem;">🏗️ System Architecture & Decisions</h4>
      <div style="margin-bottom: 0.55rem;">
        <strong style="color: var(--text-main); font-size: 0.88rem;">Pattern:</strong> 
        <span style="color: var(--text-muted); font-family: var(--font-mono); font-size: 0.84rem;">${
          proj.architecture.pattern
        }</span>
      </div>
      <div style="margin-bottom: 0.55rem;">
        <strong style="color: var(--text-main); font-size: 0.88rem;">Data Flow:</strong> 
        <span style="color: var(--text-muted); font-family: var(--font-mono); font-size: 0.84rem;">${
          proj.architecture.layers
        }</span>
      </div>
      <div>
        <strong style="color: var(--text-main); font-size: 0.88rem;">Key Technical Decisions:</strong> 
        <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.2rem;">${
          proj.architecture.keyDecisions
        }</p>
      </div>
    </div>

    <div style="margin-bottom: 1.35rem;">
      <h4 style="font-size: 1.02rem; color: var(--text-main); margin-bottom: 0.55rem;">Complete Tech Stack</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
        ${techChipsHtml}
      </div>
    </div>

    <div style="display: flex; gap: 0.75rem; padding-top: 0.85rem; border-top: 1px solid var(--border-glass);">
      <a href="${
        proj.githubUrl
      }" target="_blank" rel="noopener" class="btn btn-primary" style="flex: 1; justify-content: center;">
        <span>Explore GitHub Repository</span>
        <span>↗</span>
      </a>
      <button type="button" class="btn btn-glass" onclick="closeProjectModal()">
        Close
      </button>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";

  const modalContent = document.getElementById("modalContent");
  if (modalContent) modalContent.innerHTML = "";
}

function handleModalOverlayClick(event) {
  if (event.target.id === "projectModal") {
    closeProjectModal();
  }
}

function switchModalGallerySlide(src, thumbElement) {
  const mainImg = document.getElementById("modalMainImg");
  if (mainImg) {
    mainImg.src = src;
  }
  const thumbs = document.querySelectorAll(".modal-thumb");
  thumbs.forEach((t) => t.classList.remove("active"));
  if (thumbElement) {
    thumbElement.classList.add("active");
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});

function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/* --------------------------------------------------------------------------
   7. Contact Form Handling (Direct to Gmail Inbox)
   -------------------------------------------------------------------------- */
async function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const statusMsg = document.getElementById("formStatusMsg");
  const submitBtn = document.getElementById("btnSubmitForm");

  if (!name || !email || !message) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Sending...</span><span>⏳</span>`;

  try {
    // Attempt async submission to free public email forwarder (FormSubmit / Formspree)
    const response = await fetch("https://formsubmit.co/ajax/elgebaly3laa@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `New Mobile Developer Inquiry from ${name}`
      })
    });

    if (response.ok) {
      statusMsg.className = "form-status-msg success";
      statusMsg.textContent = "✓ Message sent successfully! It has been delivered directly to elgebaly3laa@gmail.com.";
      document.getElementById("contactForm").reset();
    } else {
      throw new Error("Form forwarding endpoint responded with error");
    }
  } catch (error) {
    // Fallback: Trigger default mail client
    const subject = encodeURIComponent(`Mobile Opportunity from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:elgebaly3laa@gmail.com?subject=${subject}&body=${body}`;

    statusMsg.className = "form-status-msg success";
    statusMsg.textContent = "Your email client has been opened to complete sending the message to elgebaly3laa@gmail.com.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Send Direct to Inbox</span><span>✈️</span>`;
  }
}
