const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
const heroSection = canvas.parentElement;   // .hero
let particles = [];
let w, h;

function resize(){
  w = canvas.width = heroSection.offsetWidth;
  h = canvas.height = heroSection.offsetHeight;

  particles = [];
  const COUNT = Math.min(45, Math.floor((w*h)/16000));
  for(let i=0;i<COUNT;i++) particles.push(new Particle());
}

class Particle{
  constructor(){
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.vx = (Math.random()-0.5)*0.35;
    this.vy = (Math.random()-0.5)*0.35;
    this.r = 1.6;
  }
  move(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x < 0 || this.x > w) this.vx *= -1;
    if(this.y < 0 || this.y > h) this.vy *= -1;
  }
}

function draw(){
  ctx.clearRect(0,0,w,h);
  const dotColor = 'rgba(255,142,1,0.55)';
  const lineColorBase = '255,142,1';

  particles.forEach(p=>{
    p.move();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = dotColor;
    ctx.fill();
  });

  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 110){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${lineColorBase},${1 - dist/110})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}


resize();

window.addEventListener('load', resize);

if(window.ResizeObserver){
  new ResizeObserver(resize).observe(heroSection);
}

window.addEventListener('resize', resize);

draw();