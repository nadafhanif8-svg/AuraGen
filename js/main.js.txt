const card = document.querySelector(".card");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// SCROLL ANIMATIONS
const revealElements = document.querySelectorAll(
  ".feature-card, .use-case-card, .pricing-card, .testimonial-card"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));
