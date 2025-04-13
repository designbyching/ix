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
      glitch.classList.remove(...glitchStyles);
      glitch.classList.add(glitchStyles[currentIndex]);
      currentIndex = (currentIndex + 1) % glitchStyles.length;
    }, 5000);
  }
  cycleGlitch();
}

// Portfolio Slideshow
const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach((item, index) => {
  const link = item.querySelector(".grid-link");
  const slideshow = item.querySelector(".slideshow");
  const prevBtn = slideshow.querySelector(".prev");
  const nextBtn = slideshow.querySelector(".next");
  const closeBtn = slideshow.querySelector(".close-btn");
  const slides = slideshow.querySelector(".slides");
  const images = slides.querySelectorAll("img");
  let currentSlide = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;

  // Expand on link click
  link.addEventListener("click", (e) => {
    e.preventDefault();
    gridItems.forEach((i) => {
      i.classList.remove("expanded");
      i.querySelector(".slideshow").classList.remove("auto");
    });
    item.classList.add("expanded");
    slideshow.classList.add("auto");
    currentSlide = 0;
    updateSlides();
  });

  // Close slideshow
  closeBtn.addEventListener("click", () => {
    item.classList.remove("expanded");
    slideshow.classList.remove("auto");
    slides.style.transform = `translateX(0)`; // Reset position
  });

  // Manual navigation
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    updateSlides();
    slideshow.classList.remove("auto"); // Pause auto on manual control
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % images.length;
    updateSlides();
    slideshow.classList.remove("auto"); // Pause auto on manual control
  });

  // Swipe support
  slideshow.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentTranslate = currentSlide * -11.1111;
    slideshow.classList.remove("auto"); // Pause animation
    slides.style.transition = "none"; // Smooth dragging
  });

  slideshow.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const translatePercent =
      currentTranslate + (diffX / slideshow.offsetWidth) * 100;
    slides.style.transform = `translateX(${translatePercent}%)`;
  });

  slideshow.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    slides.style.transition = "transform 0.5s ease";
    const movedBy =
      (startX - e.changedTouches[0].clientX) / slideshow.offsetWidth;
    if (movedBy > 0.2 && currentSlide < images.length - 1) {
      currentSlide++;
    } else if (movedBy < -0.2 && currentSlide > 0) {
      currentSlide--;
    }
    updateSlides();
  });

  function updateSlides() {
    slides.style.transform = `translateX(-${currentSlide * 11.1111}%)`;
  }
});
