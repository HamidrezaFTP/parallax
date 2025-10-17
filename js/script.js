"use strict";

const parallaxSection = document.querySelector(".parallax-section");
const layers = document.querySelectorAll(".layer");
let ticking = false;

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
