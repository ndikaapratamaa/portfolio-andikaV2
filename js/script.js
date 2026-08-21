// === TESTIMONIAL SLIDER ===
const testimonials = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".testimonial-dots .dot");
let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

// Auto-slide tiap 5 detik
let testimonialTimer = setInterval(nextTestimonial, 5000);

// Klik manual di dot
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(testimonialTimer);
    showTestimonial(index);
    currentIndex = index;
    testimonialTimer = setInterval(nextTestimonial, 5000);
  });
});

// === SCROLL TO TOP BUTTON ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Update warna tombol scroll saat mode berubah
const observerMode = new MutationObserver(() => {
  if (document.body.classList.contains("light-mode")) {
    scrollTopBtn.style.background = "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)";
  } else {
    scrollTopBtn.style.background = "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)";
  }
});

observerMode.observe(document.body, { attributes: true, attributeFilter: ["class"] });













// === SLEEP MODE (IDLE DETECTION) ===
let idleTime = 0;

function resetIdle() {
  idleTime = 0;
  deactivateSleepMode();
}

function activateSleepMode() {
  document.body.style.transition = "filter 1s ease";
  document.body.style.filter = "brightness(30%)"; // redupkan layar
}

function deactivateSleepMode() {
  document.body.style.filter = "brightness(100%)"; // kembali normal
}

// Reset timer setiap ada interaksi
document.onmousemove = resetIdle;
document.onkeydown = resetIdle;
document.onclick = resetIdle;
document.onscroll = resetIdle;

// Hitung waktu idle setiap detik
setInterval(() => {
  idleTime++;
  if (idleTime >= 10) { // 10 detik sebagai contoh
    activateSleepMode();
  }
}, 1000);




