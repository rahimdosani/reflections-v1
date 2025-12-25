/* =========================
   UNIVERSAL INTRO + AUDIO
   (Android + iOS SAFE)
========================= */

const music = document.getElementById("bg-music");
const intro = document.getElementById("intro");

let started = false;

// This function MUST be triggered directly by a user tap
function startExperience() {
  if (started) return;
  started = true;

  // 🔑 CRITICAL: Direct audio play inside user gesture
  music.currentTime = 0;
  music.volume = 0.15;
  music.play().catch(() => {
    // If blocked (rare), we silently fail without breaking UX
  });

  // Reveal main content
  document.body.classList.add("started");

  // Fade out intro
  intro.classList.add("hidden");

  setTimeout(() => {
    intro.style.display = "none";
  }, 1000);
}

// Attach ONLY to intro (clear user intent)
intro.addEventListener("click", startExperience);
intro.addEventListener("touchstart", startExperience);

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

const particles = Array.from({ length: 50 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 0.8,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25
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
