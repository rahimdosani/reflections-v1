/* =========================
   INTRO + MUSIC + REVEAL
========================= */

const music = document.getElementById("bg-music");
const intro = document.getElementById("intro");

music.volume = 0.15;

let started = false;

function startExperience() {
  if (started) return;
  started = true;

  // Start background music
  music.play().catch(() => {});

  // Reveal main content
  document.body.classList.add("started");

  // Fade out intro overlay
  intro.classList.add("hidden");

  setTimeout(() => {
    intro.style.display = "none";

    // Gentle scroll so it feels like progression
    window.scrollTo({
      top: window.innerHeight * 0.25,
      behavior: "smooth"
    });
  }, 1200);
}

// Global listeners (guaranteed to fire)
window.addEventListener("click", startExperience, { once: true });
window.addEventListener("touchstart", startExperience, { once: true });

/* =========================
   PARTICLES BACKGROUND
========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 0.8,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3
}));

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.6)";

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
