const canvas = document.querySelector("canvas");
// .getContext('2d') => draw anything in 2D in the canva
const ctx = canvas.getContext('2d');


// Prendre les 100% de la page
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw(){
    // Begin the path of our circle
    ctx.beginPath();
    // draw a circle
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    // remplir avec la coleur "fillStyle"
    ctx.fill();
  }
  update(){
    // Touche the border of window
    if(this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    else if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

const particle1 = new Particle(10, 10, 50, 55, 2, "#f1f1f1");
console.log(particle1);

// Create un tableau
let particlesArray;

function init(){
  particlesArray = [];

  const numberOfParticles = (canvas.height * canvas.width) / 4000;

  for (let i = 0; i < numberOfParticles; i++) {
    // [1 -3(non-inclus)]
    const size = (Math.random() * 2) + 1;
    // Math.random() * (tailleMax - min + 1) + min;
    const x = Math.random() * ((innerWidth -10) - 10 + 1) + 10;
    const y = Math.random() * ((innerHeight -10) - 10 + 1) + 10;

    const directionX = cleanDirection();
    const directionY = cleanDirection();
    particlesArray.push(new Particle(x, y, directionX, directionY, size, "#f1f1f1"));
  }
}
init();

function cleanDirection() {
  // 0 ou 1
  const random = Math.trunc(Math.random() * 2);
  if (random) {
    // [0.5 - 1.5[
    return (Math.random() * 1) + 0.05;
  }
  else {
    return (Math.random() * -1) - 0.05;
  }
}

function animate(){
  // Supprimer tous ce qu'il y a dedans
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
  requestAnimationFrame(animate);
}
animate();


function connect() {

  for (let i = 0; i < particlesArray.length; i++) {

    for (let j = i + 1; j < particlesArray.length; j++) {

      const squaredDistanceX = (particlesArray[i].x - particlesArray[j].x) * (particlesArray[i].x - particlesArray[j].x)
      const squaredDistanceY = (particlesArray[i].y - particlesArray[j].y) * (particlesArray[i].y - particlesArray[j].y)


      const hypothenuse = squaredDistanceX + squaredDistanceY;

      if(hypothenuse < (135 * 135)) {
        ctx.strokeStyle = `rgba(240,240,240,${1 - hypothenuse/ (135*135)})`
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("resize", handleResize)

function handleResize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}
