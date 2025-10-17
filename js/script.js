"use strict";

const parallaxSection = document.querySelector(".parallax-section");
const layers = document.querySelectorAll(".layer");
const galleryGrid = document.querySelector(".gallery-grid");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const counter = document.querySelector(".counter");

let ticking = false;
let currentIndex = 0;

const handleParallax = () => {
  const scrollY = window.scrollY || window.pageYOffset;

  // Compute visible part of section relative to viewport
  const sectionTop = parallaxSection.offsetTop;
  const sectionHeight = parallaxSection.offsetHeight;
  const scrollProgress = (scrollY - sectionTop) / sectionHeight;

  // Move layers based on their data-speed
  layers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed) || 0;
    const move = scrollProgress * 500 * speed;
    layer.style.transform = `translateY(${move}px)`;
  });
};

// Named scroll handler (prevents anonymous listeners and enables clean add/remove)
const scrollHandler = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleParallax();
      ticking = false;
    });
    ticking = true;
  }
};

// Only run parallax while section is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the named handler once
        window.addEventListener("scroll", scrollHandler, { passive: true });
        // Run one frame to ensure correct position when entering
        handleParallax();
      } else {
        // Remove the same named handler
        window.removeEventListener("scroll", scrollHandler);
        // Reset ticking so the handler can be re-used cleanly
        ticking = false;
      }
    });
  },
  { threshold: 0.1 }
);

if (parallaxSection) {
  observer.observe(parallaxSection);
} else {
  // Defensive: if the section is missing, no-op but keep script safe
  console.warn(".parallax-section not found — parallax disabled.");
}

// Lightbox functionality
const openLightbox = () => {
  const totalImages = galleryGrid.children.length;
  lightboxImage.src = galleryGrid.children[currentIndex].src;
  counter.textContent = `${currentIndex + 1} of ${totalImages}`;
  document.body.classList.add("no-scroll");
};

galleryGrid.addEventListener("click", (e) => {
  const clickedImage = e.target.closest(".gallery-item");

  if (!clickedImage) return;

  currentIndex = [...galleryGrid.children].indexOf(clickedImage);
  lightbox.style.display = "flex";
  openLightbox();
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  document.body.classList.remove("no-scroll");
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryGrid.children.length;
  openLightbox();
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryGrid.children.length) %
    galleryGrid.children.length;
  openLightbox();
});

window.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});
