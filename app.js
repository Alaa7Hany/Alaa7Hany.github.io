/**
 * Portfolio Application Controller
 * Handles responsive navigation, project browsing and details, verified experience,
 * and async contact form feedback.
 */

let isProjectsExpanded = false;
let currentCategoryFilter = "all";
let projectModalReturnFocus = null;
let isContactSubmitting = false;

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbarScroll();
  initMobileNavigation();
  initCategoryFilters();
  initSelectedProjectDetails();
  initProjectExpansion();
  initProjectModalInteractions();
  initContactForm();
  renderProjectCards();
  renderExperience();
});

function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  let theme = root.dataset.theme === "light" ? "light" : "dark";

  try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") theme = savedTheme;
  } catch {}

  const applyTheme = (nextTheme) => {
    theme = nextTheme === "light" ? "light" : "dark";
    root.dataset.theme = theme;
    const nextLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    toggle?.setAttribute("aria-label", nextLabel);
    toggle?.setAttribute("title", nextLabel);
  };

  applyTheme(theme);
  toggle?.addEventListener("click", () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {}
  });
}

function initMobileNavigation() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  const mobileQuery = window.matchMedia("(max-width: 768px)");
  let isOpen = false;
  const syncViewport = () => {
    toggle.hidden = !mobileQuery.matches;
    if (!mobileQuery.matches) isOpen = false;
    links.hidden = mobileQuery.matches && !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    toggle.querySelector(".nav-toggle-label").textContent = isOpen ? "Close" : "Menu";
  };
  const closeMenu = (restoreFocus = false) => {
    if (!mobileQuery.matches || !isOpen) return;
    isOpen = false;
    syncViewport();
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    isOpen = !isOpen;
    syncViewport();
    if (isOpen) links.querySelector("a:not([hidden])")?.focus();
  });
  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu(true);
  });
  mobileQuery.addEventListener("change", syncViewport);
  syncViewport();
}

function renderExperience() {
  const section = document.getElementById("experience");
  const list = document.getElementById("experienceList");
  const navLink = document.querySelector("[data-experience-link]");
  const entries = Array.isArray(EXPERIENCE_DATA) ? EXPERIENCE_DATA : [];
  if (!section || !list) return;

  if (entries.length === 0) {
    section.hidden = true;
    const navItem = navLink?.closest("li");
    if (navItem) navItem.hidden = true;
    return;
  }

  const fragment = document.createDocumentFragment();
  entries.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "experience-entry";

    const meta = document.createElement("div");
    meta.className = "experience-meta";
    const period = document.createElement("p");
    period.className = "experience-period";
    period.textContent = entry.period;
    const location = document.createElement("p");
    location.className = "experience-location";
    location.textContent = entry.location;
    meta.append(location, period);

    const heading = document.createElement("div");
    heading.className = "experience-heading";
    const title = document.createElement("h3");
    title.textContent = entry.title;
    const organization = document.createElement("p");
    organization.className = "experience-organization";
    organization.textContent = entry.organization;
    heading.append(title, organization);

    const statement = document.createElement("p");
    statement.className = "experience-statement";
    statement.textContent = entry.statement || "";
    const responsibilities = document.createElement("ul");
    responsibilities.className = "experience-responsibilities";
    (entry.outcomes || []).forEach((responsibility) => {
      const item = document.createElement("li");
      item.textContent = responsibility;
      responsibilities.append(item);
    });

    const technologies = document.createElement("p");
    technologies.className = "experience-technologies";
    technologies.textContent = entry.technologies.join(" · ");
    article.append(heading, statement, responsibilities, technologies);
    if (entry.url) {
      const link = document.createElement("a");
      link.className = "experience-visit";
      link.href = entry.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = entry.linkLabel || "Visit project";
      article.append(link);
    }
    article.append(meta);

    fragment.append(article);
  });
  list.replaceChildren(fragment);
}

function initSelectedProjectDetails() {
  document.querySelectorAll(".project-detail-link").forEach((button) => {
    button.addEventListener("click", () => openProjectModal(button.dataset.projectId, button));
  });
}

function initProjectExpansion() {
  const button = document.getElementById("btnToggleAllProjects");
  if (button) button.addEventListener("click", toggleAllProjects);
}

/* --------------------------------------------------------------------------
   1. Navbar Scroll Spy & Sticky Highlight
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const navbar = document.getElementById("navbar");
  const updateActiveLink = (preferHash = false) => {
    const hashSection = preferHash ? document.getElementById(location.hash.slice(1)) : null;
    const sectionIsVisible = (section) => section && !section.hidden;
    const scrollLine = window.scrollY + (navbar?.offsetHeight || 0) + 24;
    let current = sectionIsVisible(hashSection) ? hashSection.id : "";
    if (!current) {
      current = "home";
      sections.forEach((section) => {
        if (!section.hidden && section.offsetTop <= scrollLine) current = section.id;
      });
    }
    if (current === "home" || current === "projects") current = "projects";
    if (["education", "credentials", "resume"].includes(current)) current = "credentials";
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", () => updateActiveLink(), { passive: true });
  window.addEventListener("hashchange", () => updateActiveLink(true));
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.toggle("active", item === link));
    });
  });
  updateActiveLink(true);
}

/* --------------------------------------------------------------------------
   2. Category Filtering & Top 3 / Show More Logic
   -------------------------------------------------------------------------- */
function initCategoryFilters() {
  const filterTabs = document.getElementById("filterTabs");
  if (!filterTabs) return;

  const tabButtons = filterTabs.querySelectorAll(".tab-btn");
  tabButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  });
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      tabButtons.forEach((button) => button.setAttribute("aria-pressed", String(button === btn)));

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
  const projects = Array.isArray(PROJECTS_DATA) ? PROJECTS_DATA : [];
  grid.replaceChildren();

  // 1. Filter by category
  const filteredProjects = projects.filter((proj) => {
    if (currentCategoryFilter === "all") return true;
    return proj.category === currentCategoryFilter;
  });

  if (filteredProjects.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "projects-empty-state";
    emptyState.textContent = projects.length === 0
      ? "Projects will appear here soon."
      : "No projects found in this category.";
    grid.append(emptyState);
    if (showMoreWrap) showMoreWrap.hidden = true;
    return;
  }

  // 2. Decide how many to display
  let displayedProjects = filteredProjects;
  if (currentCategoryFilter === "all" && !isProjectsExpanded) {
    displayedProjects = filteredProjects.slice(0, 3);
  }

  // 3. Update Toggle Button UI
  if (showMoreWrap && btnToggle) {
    const canExpand = currentCategoryFilter === "all" && filteredProjects.length > 3;
    showMoreWrap.hidden = !canExpand;
    btnToggle.textContent = isProjectsExpanded
      ? "Show fewer projects"
      : "Show more projects";
    btnToggle.setAttribute("aria-expanded", String(isProjectsExpanded));
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
          <img src="${proj.coverImage}" alt="${proj.title}" width="640" height="360" loading="lazy" />
          <span class="project-badge-corner">${badgeText}</span>
        </div>
      `;
    } else {
      previewHtml = `
        <div class="project-preview project-preview-empty">
          <span>${proj.title}</span>
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
          ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-repo">
            <span>GitHub</span>
            <span>↗</span>
          </a>` : ""}
          <button type="button" class="btn-card-action btn-deep-dive" data-project-id="${proj.id}" aria-haspopup="dialog" aria-label="Open ${proj.title} project details">
            <span>Deep Dive</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    `;

    const image = card.querySelector(".project-preview img");
    if (image) {
      image.addEventListener("error", () => image.closest(".project-preview")?.remove(), { once: true });
    }
    card.querySelector(".btn-deep-dive")?.addEventListener("click", (event) => {
      openProjectModal(proj.id, event.currentTarget);
    });
    grid.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   6. Architecture Deep-Dive Modal Logic
   -------------------------------------------------------------------------- */
function initProjectModalInteractions() {
  const modal = document.getElementById("projectModal");
  const closeButton = document.getElementById("modalCloseButton");
  const modalContent = document.getElementById("modalContent");
  if (!modal || !closeButton || !modalContent) return;

  closeButton.addEventListener("click", closeProjectModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeProjectModal();
      return;
    }
    if (event.target.closest(".modal-close-action")) closeProjectModal();
  });
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProjectModal();
  });
}

function openProjectModal(projectId, trigger = document.activeElement) {
  if (typeof PROJECTS_DATA === "undefined") return;
  const proj = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalTagline = document.getElementById("modalTagline");
  const modalContent = document.getElementById("modalContent");

  if (modal.open) closeProjectModal();
  projectModalReturnFocus = trigger;
  modalTitle.textContent = proj.title || "Project details";
  modalTagline.textContent = proj.modalSummary || proj.tagline || proj.summary || "";
  modalTagline.hidden = !modalTagline.textContent;
  const mediaPaths = [...new Set([
    ...(Array.isArray(proj.gallery) ? proj.gallery : []),
    proj.coverImage
  ].filter(Boolean))];
  modalContent.replaceChildren();

  if (mediaPaths.length) {
    const figure = document.createElement("figure");
    figure.className = "modal-gallery";

    const stage = document.createElement("div");
    stage.className = "modal-gallery-stage";
    let image = document.createElement("img");
    image.className = "modal-gallery-image";
    image.width = 1280;
    image.height = 720;
    image.decoding = "async";

    const previous = document.createElement("button");
    previous.className = "modal-gallery-control modal-gallery-previous";
    previous.type = "button";
    previous.setAttribute("aria-label", "Show previous project image");
    previous.textContent = "‹";

    const next = document.createElement("button");
    next.className = "modal-gallery-control modal-gallery-next";
    next.type = "button";
    next.setAttribute("aria-label", "Show next project image");
    next.textContent = "›";

    const counter = document.createElement("figcaption");
    counter.className = "modal-gallery-counter";
    counter.setAttribute("aria-live", "polite");

    const thumbnails = document.createElement("div");
    thumbnails.className = "modal-gallery-thumbnails";
    thumbnails.setAttribute("aria-label", `${proj.title} project images`);

    let availablePaths = [...mediaPaths];
    let activeIndex = 0;

    const removeUnavailablePath = (failedPath) => {
      const failedIndex = availablePaths.indexOf(failedPath);
      if (failedIndex === -1) return;
      availablePaths.splice(failedIndex, 1);
      if (failedIndex < activeIndex) activeIndex -= 1;
      if (activeIndex >= availablePaths.length) activeIndex = 0;
      renderGallery();
    };

    const renderGallery = () => {
      if (!availablePaths.length) {
        figure.remove();
        return;
      }

      activeIndex = (activeIndex + availablePaths.length) % availablePaths.length;
      const activePath = availablePaths[activeIndex];
      const nextImage = image.cloneNode(false);
      nextImage.src = activePath;
      nextImage.alt = `${proj.title} project preview ${activeIndex + 1} of ${availablePaths.length}`;
      nextImage.addEventListener("error", () => removeUnavailablePath(activePath), { once: true });
      image.replaceWith(nextImage);
      image = nextImage;
      counter.textContent = `${activeIndex + 1} / ${availablePaths.length}`;
      previous.hidden = availablePaths.length < 2;
      next.hidden = availablePaths.length < 2;
      thumbnails.hidden = availablePaths.length < 2;
      stage.tabIndex = availablePaths.length > 1 ? 0 : -1;
      stage.setAttribute(
        "aria-label",
        availablePaths.length > 1
          ? `${proj.title} image gallery. Use left and right arrow keys to browse.`
          : `${proj.title} project image.`
      );

      thumbnails.replaceChildren();
      availablePaths.forEach((path, index) => {
        const button = document.createElement("button");
        button.className = "modal-gallery-thumbnail";
        button.type = "button";
        button.setAttribute("aria-label", `Show project image ${index + 1}`);
        const isActive = index === activeIndex;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-current", isActive ? "true" : "false");

        const thumbnail = document.createElement("img");
        thumbnail.src = path;
        thumbnail.alt = "";
        thumbnail.width = 160;
        thumbnail.height = 90;
        thumbnail.loading = "lazy";
        thumbnail.addEventListener("error", () => removeUnavailablePath(path), { once: true });
        button.addEventListener("click", () => showImage(index));
        button.append(thumbnail);
        thumbnails.append(button);
      });

      thumbnails.querySelector(".active")?.scrollIntoView({ block: "nearest", inline: "nearest" });
    };

    const showImage = (index) => {
      activeIndex = index;
      renderGallery();
    };

    previous.addEventListener("click", () => showImage(activeIndex - 1));
    next.addEventListener("click", () => showImage(activeIndex + 1));
    stage.addEventListener("keydown", (event) => {
      if (availablePaths.length < 2) return;
      if (event.key === "ArrowLeft") showImage(activeIndex - 1);
      else if (event.key === "ArrowRight") showImage(activeIndex + 1);
      else if (event.key === "Home") showImage(0);
      else if (event.key === "End") showImage(availablePaths.length - 1);
      else return;
      event.preventDefault();
    });
    stage.append(image, previous, next, counter);
    figure.append(stage, thumbnails);
    modalContent.append(figure);
    renderGallery();
  }

  const highlights = Array.isArray(proj.modalHighlights)
    ? proj.modalHighlights.slice(0, 3)
    : (Array.isArray(proj.highlights) ? proj.highlights.slice(0, 3) : []);
  if (highlights.length) {
    const section = document.createElement("section");
    section.className = "modal-highlights";
    const heading = document.createElement("h4");
    heading.textContent = "Highlights";
    const list = document.createElement("ul");
    highlights.forEach((highlight) => {
      const item = document.createElement("li");
      item.textContent = makeConciseHighlight(highlight);
      list.append(item);
    });
    section.append(heading, list);
    modalContent.append(section);
  }

  const technologies = document.createElement("p");
  technologies.className = "modal-technologies";
  technologies.textContent = (Array.isArray(proj.techStack) ? proj.techStack.slice(0, 5) : []).join(" · ");
  if (technologies.textContent) modalContent.append(technologies);

  const links = document.createElement("div");
  links.className = "modal-links";
  [
    [proj.githubUrl, "GitHub repository"],
    [proj.youtubeUrl, "Watch demo"]
  ].forEach(([url, label]) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${label} ↗`;
    links.append(link);
  });
  if (links.childElementCount) modalContent.append(links);

  document.body.classList.add("modal-open");
  modal.showModal();
  document.getElementById("modalCloseButton")?.focus();
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal?.open) return;
  modal.close();
  document.body.classList.remove("modal-open");

  const modalContent = document.getElementById("modalContent");
  if (modalContent) modalContent.replaceChildren();
  if (projectModalReturnFocus?.isConnected) projectModalReturnFocus.focus();
  projectModalReturnFocus = null;
}

function makeConciseHighlight(value) {
  const text = String(value || "").trim();
  if (text.length <= 132) return text;
  const shortened = text.slice(0, 129).replace(/\s+\S*$/, "");
  return `${shortened}…`;
}

/* --------------------------------------------------------------------------
   7. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", handleContactSubmit);
  form.querySelectorAll(".form-control").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") !== "true") return;
      updateContactFieldError(field);
      const status = document.getElementById("formStatusMsg");
      if (status?.dataset.state === "validation" && form.querySelector('[aria-invalid="true"]') === null) {
        setContactStatus(status, "", "");
      }
    });
  });
}

function updateContactFieldError(field) {
  const error = document.getElementById(`${field.id}Error`);
  const label = document.querySelector(`label[for="${field.id}"]`)?.textContent || "This field";
  let message = "";

  if (field.required && !field.value.trim()) {
    message = `${label} is required.`;
  } else if (field.type === "email" && !field.validity.valid) {
    message = "Enter a valid email address.";
  }

  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) {
    error.textContent = message;
    error.hidden = !message;
  }
  return message;
}

function setContactStatus(status, message, state) {
  status.textContent = message;
  const visualState = state === "validation" ? "error" : state;
  status.className = `form-status-msg${visualState ? ` ${visualState}` : ""}`;
  status.dataset.state = state;
  status.hidden = !message;
}

async function handleContactSubmit(event) {
  event.preventDefault();
  if (isContactSubmitting) return;

  const form = event.currentTarget;
  const fields = [...form.querySelectorAll(".form-control")];
  const invalidFields = fields.filter((field) => updateContactFieldError(field));
  const status = document.getElementById("formStatusMsg");
  if (invalidFields.length > 0) {
    setContactStatus(status, "Please check the highlighted fields.", "validation");
    invalidFields[0].focus();
    return;
  }

  const submitButton = document.getElementById("btnSubmitForm");
  const [nameField, emailField, messageField] = fields;
  const payload = {
    name: nameField.value.trim(),
    email: emailField.value.trim(),
    message: messageField.value.trim()
  };
  const controller = new AbortController();
  let timeoutId;

  isContactSubmitting = true;
  form.setAttribute("aria-busy", "true");
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";
  setContactStatus(status, "Sending your message…", "pending");

  try {
    timeoutId = window.setTimeout(() => controller.abort(), 20000);
    const response = await fetch("https://formsubmit.co/ajax/elgebaly3laa@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        ...payload,
        _subject: `New Mobile Developer Inquiry from ${payload.name}`
      }),
      signal: controller.signal
    });

    if (!response.ok) throw new Error("The message service returned an error.");
    form.reset();
    fields.forEach((field) => {
      field.removeAttribute("aria-invalid");
      const error = document.getElementById(`${field.id}Error`);
      if (error) {
        error.textContent = "";
        error.hidden = true;
      }
    });
    setContactStatus(status, "Message sent. Thank you for reaching out.", "success");
  } catch (error) {
    setContactStatus(
      status,
      "Your message could not be sent. Your details are still here; please try again or contact me by WhatsApp or email.",
      "error"
    );
  } finally {
    window.clearTimeout(timeoutId);
    isContactSubmitting = false;
    form.removeAttribute("aria-busy");
    submitButton.disabled = false;
    submitButton.textContent = "Send message";
  }
}
