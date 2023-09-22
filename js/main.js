const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = 260;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(2), 500, 30, 50);

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  
  ctx.save();
  ctx.translate(0, -car.y+canvas.height * 0.5)

  road.draw(ctx);
  car.draw(ctx);
  requestAnimationFrame(animate);
}

animate()