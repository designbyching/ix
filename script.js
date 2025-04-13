// Nav Toggle for Mobile
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Glitch Effect: Cycle 3 Styles
const glitch = document.querySelector(".glitch");
if (glitch) {
  const glitchStyles = ["scramble", "offset", "pulse"];

  function cycleGlitch() {
    let currentIndex = 0;
    setInterval(() => {
      glitch.classList.remove(...glitchStyles); // Remove all styles
      glitch.classList.add(glitchStyles[currentIndex]); // Add current style
      currentIndex = (currentIndex + 1) % glitchStyles.length; // Cycle
    }, 5000); // Switch every 5 seconds
  }

  cycleGlitch();
}
