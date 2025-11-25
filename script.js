// === TOGGLE MOBILE MENU ===
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Attach event listeners for hamburger menu links
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll("#hamburger-nav .menu-links a");
  menuLinks.forEach(link => {
    link.addEventListener("click", function () {
      // Close menu after click
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      menu.classList.remove("open");
      icon.classList.remove("open");
    });
  });

  // Hamburger icon toggles menu
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", toggleMenu);
  }
});

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
