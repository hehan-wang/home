// 粒子参数
const PARTICLE_NUM = 60;
const PARTICLE_COLOR = 'rgba(0,255,255,0.7)';
const LINE_COLOR = 'rgba(0,255,255,0.13)';
const PARTICLE_RADIUS = 2.2;
const LINE_DIST = 120;
const SPEED = 0.3;

const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.vx = random(-SPEED, SPEED);
    this.vy = random(-SPEED, SPEED);
    this.radius = PARTICLE_RADIUS + Math.random();
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = PARTICLE_COLOR;
    ctx.shadowColor = '#00eaff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const particles = Array.from({ length: PARTICLE_NUM }, () => new Particle());

function drawLines() {
  for (let i = 0; i < PARTICLE_NUM; i++) {
    for (let j = i + 1; j < PARTICLE_NUM; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (dist < LINE_DIST) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1.1 - dist / LINE_DIST;
        ctx.globalAlpha = 1 - dist / LINE_DIST;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawLines();
  for (const p of particles) {
    p.move();
    p.draw();
  }
  requestAnimationFrame(animate);
}

animate(); 