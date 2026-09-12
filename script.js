```js
// =====================================================
// SAFE SITE SCRIPT
// =====================================================

const site = typeof SITE !== "undefined" ? SITE : {};

function setText(id, value = "") {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "";
}

function setHTML(id, value = "") {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value ?? "";
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.href = value;
}


// =====================================================
// SITE CONTENT
// =====================================================

function setSiteContent() {
  setText("brand", site.brand);
  setText("heroEyebrow", site.heroEyebrow);
  setHTML("heroHeadline", site.heroHeadline);
  setText("heroIntro", site.heroIntro);
  setText("availabilityText", site.availability);

  setHref("heroCv", site.cv);
  setHref("footerCv", site.cv);

  setText("aboutTitle", site.aboutTitle);

  // Keep the contact heading exactly as intended.
  setHTML(
    "contactHeading",
    "Got a story?<br><em>Let's cut to it.</em>"
  );

  document.querySelectorAll("[data-email]").forEach(el => {
    if (site.email) el.textContent = site.email;
  });

  document.querySelectorAll("[data-linkedin]").forEach(el => {
    if (site.linkedin) el.href = site.linkedin;
  });

  document.querySelectorAll("[data-instagram]").forEach(el => {
    if (site.instagram) el.href = site.instagram;
  });

  document.querySelectorAll("[data-youtube]").forEach(el => {
    if (site.youtube) el.href = site.youtube;
  });

  // About paragraphs
  const aboutParagraphs =
    document.querySelectorAll("#aboutParagraphs p");

  if (site.aboutParagraphs && aboutParagraphs.length) {
    aboutParagraphs.forEach((p, i) => {
      if (site.aboutParagraphs[i]) {
        p.textContent = site.aboutParagraphs[i];
      }
    });
  }

  // Tools
  const toolList = document.getElementById("toolList");

  if (toolList && Array.isArray(site.tools)) {
    toolList.innerHTML = site.tools
      .map(tool => `<span>${tool}</span>`)
      .join("");
  }

  // Education
  const educationList =
    document.getElementById("educationList");

  if (educationList && Array.isArray(site.education)) {
    educationList.innerHTML = site.education
      .map(item => `
        <div class="timeline-item reveal">
          <div class="timeline-year">
            ${item.year || ""}
          </div>

          <div class="timeline-content">
            <h3>${item.title || ""}</h3>
            <p>${item.description || ""}</p>
          </div>
        </div>
      `)
      .join("");
  }

  // Experience
  const experienceList =
    document.getElementById("experienceList");

  if (experienceList && Array.isArray(site.experience)) {
    experienceList.innerHTML = site.experience
      .map(item => `
        <div class="timeline-item reveal">
          <div class="timeline-year">
            ${item.year || ""}
          </div>

          <div class="timeline-content">
            <h3>${item.title || ""}</h3>
            <p>${item.description || ""}</p>
          </div>
        </div>
      `)
      .join("");
  }

  // Services
  const serviceGrid =
    document.getElementById("serviceGrid");

  if (serviceGrid && Array.isArray(site.services)) {
    serviceGrid.innerHTML = site.services
      .map((service, i) => `
        <article class="service-card reveal">
          <span class="service-number">
            ${String(i + 1).padStart(2, "0")}
          </span>

          <h3>${service.title || ""}</h3>

          <p>${service.description || ""}</p>
        </article>
      `)
      .join("");
  }
}


// =====================================================
// PROJECTS
// =====================================================

function renderProjects() {
  const projectGrid =
    document.getElementById("projectGrid");

  if (!projectGrid || !Array.isArray(site.projects)) {
    return;
  }

  projectGrid.innerHTML = site.projects
    .map(project => `
      <article class="project-card reveal visible">
        <a
          href="${project.url || "#"}"
          target="_blank"
          rel="noopener noreferrer"
        >

          <div class="project-image">
            <img
              src="${project.image || ""}"
              alt="${project.title || ""}"
              loading="lazy"
            />
          </div>

          <div class="project-meta">
            <div>
              <span class="project-client">
                ${project.client || ""}
              </span>

              <h3>${project.title || ""}</h3>
            </div>

            <span class="project-arrow">↗</span>
          </div>

          <p>${project.description || ""}</p>

        </a>
      </article>
    `)
    .join("");
}


// =====================================================
// REVEAL ANIMATIONS
// =====================================================

function setupRevealAnimations() {
  const elements =
    document.querySelectorAll(".reveal");

  // If IntersectionObserver isn't available,
  // simply show everything.
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => {
      el.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  elements.forEach(el => observer.observe(el));
}


// =====================================================
// MOBILE NAV
// =====================================================

function setupNavigation() {
  const navToggle =
    document.querySelector(".nav-toggle");

  const navMenu =
    document.querySelector(".nav-links");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
    });
  });
}


// =====================================================
// CONTACT
// =====================================================

function setupContact() {
  const contactEmail =
    document.getElementById("contactEmail");

  if (contactEmail && site.email) {
    contactEmail.href =
      `mailto:${site.email}?subject=Video%20Editing%20Project`;
  }
}


// =====================================================
// FOOTER YEAR
// =====================================================

function setupYear() {
  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }
}


// =====================================================
// START
// =====================================================

function init() {
  setSiteContent();
  renderProjects();
  setupRevealAnimations();
  setupNavigation();
  setupContact();
  setupYear();

  // Make sure the contact heading is never hidden.
  const contactHeading =
    document.getElementById("contactHeading");

  if (contactHeading) {
    contactHeading.style.opacity = "1";
    contactHeading.style.visibility = "visible";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
```
