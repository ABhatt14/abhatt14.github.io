function setSiteContent() {
  document.getElementById("brand").textContent = SITE.brand;
  document.getElementById("heroEyebrow").textContent = SITE.heroEyebrow;
  document.getElementById("heroHeadline").innerHTML = SITE.heroHeadline;
  document.getElementById("heroIntro").textContent = SITE.heroIntro;
  document.getElementById("availabilityText").textContent = SITE.availability;

  document.getElementById("heroCv").href = SITE.cv;
  document.getElementById("footerCv").href = SITE.cv;

  document.getElementById("aboutTitle").textContent = SITE.aboutTitle;

  document.getElementById("contactHeading").innerHTML =
    "Got a story?<br><em>Let's cut to it.</em>";

  document.querySelectorAll("[data-email]").forEach(el => {
    el.textContent = SITE.email;
  });

  document.querySelectorAll("[data-linkedin]").forEach(el => {
    el.href = SITE.linkedin;
  });

  document.querySelectorAll("[data-instagram]").forEach(el => {
    el.href = SITE.instagram;
  });

  document.querySelectorAll("[data-youtube]").forEach(el => {
    el.href = SITE.youtube;
  });

  const aboutParagraphs = document.querySelectorAll("#aboutParagraphs p");
  if (SITE.aboutParagraphs && aboutParagraphs.length) {
    aboutParagraphs.forEach((p, i) => {
      if (SITE.aboutParagraphs[i]) {
        p.textContent = SITE.aboutParagraphs[i];
      }
    });
  }

  const toolList = document.getElementById("toolList");
  if (toolList && SITE.tools) {
    toolList.innerHTML = SITE.tools
      .map(tool => `<span>${tool}</span>`)
      .join("");
  }

  const educationList = document.getElementById("educationList");
  if (educationList && SITE.education) {
    educationList.innerHTML = SITE.education
      .map(item => `
        <div class="timeline-item reveal">
          <div class="timeline-year">${item.year || ""}</div>
          <div class="timeline-content">
            <h3>${item.title || ""}</h3>
            <p>${item.description || ""}</p>
          </div>
        </div>
      `)
      .join("");
  }

  const experienceList = document.getElementById("experienceList");
  if (experienceList && SITE.experience) {
    experienceList.innerHTML = SITE.experience
      .map(item => `
        <div class="timeline-item reveal">
          <div class="timeline-year">${item.year || ""}</div>
          <div class="timeline-content">
            <h3>${item.title || ""}</h3>
            <p>${item.description || ""}</p>
          </div>
        </div>
      `)
      .join("");
  }

  const serviceGrid = document.getElementById("serviceGrid");
  if (serviceGrid && SITE.services) {
    serviceGrid.innerHTML = SITE.services
      .map((service, i) => `
        <article class="service-card reveal">
          <span class="service-number">0${i + 1}</span>
          <h3>${service.title || ""}</h3>
          <p>${service.description || ""}</p>
        </article>
      `)
      .join("");
  }
}


function render() {
  const projectGrid = document.getElementById("projectGrid");

  if (projectGrid && SITE.projects) {
    projectGrid.innerHTML = SITE.projects
      .map(project => `
        <article class="project-card reveal visible">
          <a href="${project.url || "#"}"
             target="_blank"
             rel="noopener noreferrer">

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
}


/* --------------------------------
   INITIALIZE SITE
-------------------------------- */

setSiteContent();
render();


/* --------------------------------
   REVEAL ANIMATIONS
-------------------------------- */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});


/* --------------------------------
   NAVIGATION
-------------------------------- */

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");

if (navToggle && navMenu) {
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


/* --------------------------------
   CONTACT EMAIL
-------------------------------- */

const contactEmail = document.getElementById("contactEmail");

if (contactEmail && SITE.email) {
  contactEmail.href =
    `mailto:${SITE.email}?subject=Video%20Editing%20Project`;
}


/* --------------------------------
   CURRENT YEAR
-------------------------------- */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
