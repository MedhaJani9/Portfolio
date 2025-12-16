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

// === VIDEO MODAL ===
function playVideo(videoSource, videoTitle) {
  // Create modal if it doesn't exist
  let modal = document.getElementById("videoModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "videoModal";
    modal.className = "video-modal";
    modal.innerHTML = `
      <div class="video-modal-content">
        <span class="video-modal-close" onclick="closeVideoModal()">&times;</span>
        <h2 class="video-modal-title" id="videoModalTitle"></h2>
        <video id="videoPlayer" width="100%" controls style="max-width: 800px; border-radius: 8px;">
          <source id="videoSource" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  // Set video source and title
  document.getElementById("videoSource").src = videoSource;
  document.getElementById("videoModalTitle").textContent = videoTitle;
  
  // Show modal
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
    
    // Stop video playback
    const videoPlayer = document.getElementById("videoPlayer");
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  }
}

// Close modal when clicking outside the video content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("videoModal");
  if (event.target === modal) {
    closeVideoModal();
  }
});
