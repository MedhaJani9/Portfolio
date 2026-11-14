// === CONTACT FORM CONFIG ===
// Create a free form at https://formspree.io, then paste its endpoint here.
// Submissions are emailed to you; your address is never shown on the site.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// === TOGGLE MOBILE MENU ===
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
}

// Attach event listeners for hamburger menu links
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu-links a");
  menuLinks.forEach(link => {
    link.addEventListener("click", function () {
      // Close menu after click
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu && icon) {
        menu.classList.remove("open");
        icon.classList.remove("open");
      }
    });
  });
});

// === DARK / LIGHT MODE ===
// The initial theme is applied by a small inline script in <head> to avoid a flash.
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
  updateThemeToggles();
}

function updateThemeToggles() {
  const isDark = document.documentElement.dataset.theme === "dark";
  document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    btn.innerHTML = `<i class="fas ${isDark ? "fa-sun" : "fa-moon"}" aria-hidden="true"></i>`;
  });
}

document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
  btn.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
});
updateThemeToggles();

// === TYPING ANIMATION ===
function startTyping(el) {
  const words = el.dataset.words.split("|");
  if (prefersReducedMotion) {
    el.textContent = words.join(" · ");
    return;
  }

  let wordIndex = 0;
  let charIndex = words[0].length;
  let deleting = true;
  el.textContent = words[0];

  function tick() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 90;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1800; // pause on the full word
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  }

  setTimeout(tick, 1800);
}

document.querySelectorAll(".typed[data-words]").forEach(startTyping);

// === SCROLL REVEAL ===
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      )
    : null;

function observeReveal(el) {
  if (revealObserver) {
    revealObserver.observe(el);
  } else {
    el.classList.add("is-visible");
  }
}

document.querySelectorAll("section, .reveal").forEach(observeReveal);

// === SMOOTH SCROLL BEHAVIOR (optional enhancement) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }
  });
});

// === PROJECTS: CARDS, FILTERS & DETAIL POPUP ===
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function projectLinkIcons(links) {
  const wrap = el("div", "project-links");
  const icons = [
    ["live", "fas fa-external-link-alt", "Live demo"],
    ["linkedin", "fab fa-linkedin", "LinkedIn post"],
    ["github", "fab fa-github", "GitHub"],
  ];
  icons.forEach(([key, icon, label]) => {
    if (!links[key]) return;
    const a = el("a", "project-link");
    a.href = links[key];
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.title = label;
    a.setAttribute("aria-label", label);
    a.innerHTML = `<i class="${icon}" aria-hidden="true"></i>`;
    wrap.appendChild(a);
  });
  return wrap;
}

function techTags(tags) {
  const wrap = el("div", "tech-tags");
  tags.forEach(tag => wrap.appendChild(el("span", "tech-tag", tag)));
  return wrap;
}

// Shown in place of a thumbnail for projects that don't have an image yet
function projectPlaceholder(project) {
  const box = el("div", "project-placeholder");
  box.innerHTML = `<i class="${project.icon || "fas fa-code"}" aria-hidden="true"></i>`;
  box.appendChild(el("span", "project-placeholder__tags", project.tags.slice(0, 3).join(" · ")));
  return box;
}

function buildProjectCard(project, index) {
  const card = el("div", "project-card reveal");
  card.dataset.categories = project.categories.join(" ");
  card.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);

  const header = el("div", "project-header");
  const title = el("h3", "project-title");
  const open = el("button", "project-open", project.title);
  open.type = "button";
  open.setAttribute("aria-haspopup", "dialog");
  open.addEventListener("click", () => openProjectModal(project));
  title.appendChild(open);
  header.append(title, projectLinkIcons(project.links));

  const imgWrap = el("div", "project-img-container");
  if (project.image) {
    const img = el("img", "project-img");
    img.src = project.image;
    img.alt = `${project.title} preview`;
    img.loading = "lazy";
    imgWrap.appendChild(img);
  } else {
    imgWrap.appendChild(projectPlaceholder(project));
  }
  if (project.video) {
    const play = el("span", "project-play");
    play.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i> Demo';
    imgWrap.appendChild(play);
  }

  const more = el("span", "project-more");
  more.innerHTML = 'View details <i class="fas fa-arrow-right" aria-hidden="true"></i>';

  card.append(header, imgWrap, el("p", "project-description", project.summary), techTags(project.tags), more);
  // Clicking anywhere on the card opens the popup (the stretched title button covers it),
  // except the icon links, which sit above it.
  return card;
}

let projectModal;

function getProjectModal() {
  if (projectModal) return projectModal;

  projectModal = el("dialog", "project-modal");
  projectModal.setAttribute("aria-labelledby", "projectModalTitle");
  projectModal.innerHTML = `
    <button type="button" class="project-modal__close" aria-label="Close">&times;</button>
    <div class="project-modal__scroll">
      <div class="project-modal__media"></div>
      <div class="project-modal__body">
        <h2 class="project-modal__title" id="projectModalTitle"></h2>
        <div class="project-modal__tags"></div>
        <div class="project-modal__desc"></div>
        <div class="project-modal__links"></div>
      </div>
    </div>
  `;
  document.body.appendChild(projectModal);

  projectModal.querySelector(".project-modal__close").addEventListener("click", () => projectModal.close());
  // Close when clicking the dimmed backdrop
  projectModal.addEventListener("click", e => {
    if (e.target === projectModal) projectModal.close();
  });
  projectModal.addEventListener("close", () => {
    const video = projectModal.querySelector("video");
    if (video) video.pause();
    projectModal.querySelector(".project-modal__media").innerHTML = "";
    document.documentElement.classList.remove("modal-open");
  });

  return projectModal;
}

function openProjectModal(project) {
  const modal = getProjectModal();

  const media = modal.querySelector(".project-modal__media");
  media.innerHTML = "";
  if (project.video) {
    const video = el("video");
    video.src = project.video;
    if (project.image) video.poster = project.image;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    media.appendChild(video);
  } else if (!project.image) {
    media.appendChild(projectPlaceholder(project));
  } else {
    const img = el("img");
    img.src = project.image;
    img.alt = `${project.title} preview`;
    media.appendChild(img);
  }

  modal.querySelector(".project-modal__title").textContent = project.title;
  modal.querySelector(".project-modal__tags").replaceChildren(techTags(project.tags));
  modal.querySelector(".project-modal__desc").replaceChildren(
    ...project.description.split("\n\n").map(text => el("p", "", text))
  );

  const links = modal.querySelector(".project-modal__links");
  links.innerHTML = "";
  [
    ["live", "fas fa-external-link-alt", "Live demo", "btn-color-1"],
    ["github", "fab fa-github", "View on GitHub", "btn-color-1"],
    ["linkedin", "fab fa-linkedin", "LinkedIn post", "btn-color-2"],
  ].forEach(([key, icon, label, color]) => {
    if (!project.links[key]) return;
    const a = el("a", `btn ${color}`);
    a.href = project.links[key];
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<i class="${icon}" aria-hidden="true"></i> `;
    a.append(label);
    links.appendChild(a);
  });

  document.documentElement.classList.add("modal-open");
  modal.showModal();
  modal.querySelector(".project-modal__scroll").scrollTop = 0;
}

function applyProjectFilter(grid, filterId) {
  const cards = [...grid.children];
  const before = new Map(cards.filter(c => !c.hidden).map(c => [c, c.getBoundingClientRect()]));

  cards.forEach(card => {
    card.hidden = filterId !== "all" && !card.dataset.categories.split(" ").includes(filterId);
  });

  if (prefersReducedMotion) return;

  // FLIP: slide cards that stayed visible from their old spot, fade in the ones that appeared
  cards.forEach(card => {
    if (card.hidden) return;
    card.classList.add("is-visible");
    const first = before.get(card);
    if (first) {
      const last = card.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (dx || dy) {
        card.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
          { duration: 450, easing: "cubic-bezier(0.2, 0.65, 0.3, 1)" }
        );
      }
    } else {
      card.animate(
        [{ opacity: 0, transform: "scale(0.92)" }, { opacity: 1, transform: "scale(1)" }],
        { duration: 400, easing: "cubic-bezier(0.2, 0.65, 0.3, 1)" }
      );
    }
  });
}

function buildProjectFilters(container, grid) {
  PROJECT_FILTERS.forEach(filter => {
    const count =
      filter.id === "all" ? PROJECTS.length : PROJECTS.filter(p => p.categories.includes(filter.id)).length;
    const chip = el("button", "filter-chip", filter.label);
    chip.type = "button";
    chip.setAttribute("aria-pressed", String(filter.id === "all"));
    chip.appendChild(el("span", "filter-chip__count", String(count)));
    chip.addEventListener("click", () => {
      container.querySelectorAll(".filter-chip").forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
      applyProjectFilter(grid, filter.id);
    });
    container.appendChild(chip);
  });
}

if (typeof PROJECTS !== "undefined") {
  document.querySelectorAll("[data-projects]").forEach(grid => {
    PROJECTS.forEach((project, i) => {
      const card = buildProjectCard(project, i);
      grid.appendChild(card);
      observeReveal(card);
    });
    const filters = grid.parentElement.querySelector("[data-project-filters]");
    if (filters) buildProjectFilters(filters, grid);
  });
}

// === CONTACT FORM ===
document.querySelectorAll("[data-contact-form]").forEach(form => {
  const status = form.querySelector(".form-status");
  const submit = form.querySelector('button[type="submit"]');

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `form-status is-${type}`;
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      showStatus("The contact form isn't set up yet. Please reach out on LinkedIn for now.", "error");
      return;
    }

    submit.disabled = true;
    showStatus("Sending…", "info");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      showStatus("Thanks! Your message was sent — I'll get back to you soon.", "success");
    } catch (err) {
      showStatus("Sorry, something went wrong. Please try again or message me on LinkedIn.", "error");
    } finally {
      submit.disabled = false;
    }
  });
});
