// === TOGGLE MOBILE MENU ===
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// === SCROLL FADE-IN ANIMATION FOR SECTIONS ===
const sections = document.querySelectorAll("section");

function showSectionsOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) {
      section.classList.add("visible");
    }
  });
}

// Trigger on scroll + on initial load
window.addEventListener("scroll", showSectionsOnScroll);
window.addEventListener("load", showSectionsOnScroll);

// === SMOOTH SCROLL BEHAVIOR (optional enhancement) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: "smooth"
      });
    }
  });
});
