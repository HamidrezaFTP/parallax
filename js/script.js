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
    const speed = parseFloat(layer.dataset.speed);
    const move = scrollProgress * 500 * speed;
    layer.style.transform = `translateY(${move}px)`;
  });
};

// Only run parallax while section is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              handleParallax();
              ticking = false;
            });
            ticking = true;
          }
        });
      } else {
        window.removeEventListener("scroll", handleParallax);
      }
    });
  },
  { threshold: 0.1 }
);

observer.observe(parallaxSection);
