// 粒子动效 inspired by tsParticles, 简洁科技蓝色风格
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_NUM = 60;
const COLOR = '#2563eb';
const LINE_COLOR = 'rgba(37,99,235,0.18)';
const PARTICLE_RADIUS = 2.2;
const SPEED = 0.3;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomPos(max) {
  return Math.random() * max;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push({
      x: randomPos(canvas.width),
      y: randomPos(canvas.height),
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    });
  }
}
createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  // Draw particles
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = COLOR;
    ctx.shadowColor = COLOR;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function updateParticles() {
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    // Wrap around
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  }
}

function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}
animate();

// 重新生成粒子以适配窗口变化
window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
}); 