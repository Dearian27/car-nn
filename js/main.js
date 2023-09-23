const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = 260;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(2), 100, 30, 50, 'KEYS', 11);

const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY'),
  new Car(road.getLaneCenter(3), -400, 30, 50, 'DUMMY'),
  new Car(road.getLaneCenter(2), -300, 30, 50, 'DUMMY'),
  new Car(road.getLaneCenter(3), -250, 30, 50, 'DUMMY'),
  new Car(road.getLaneCenter(0), -150, 30, 50, 'DUMMY'),
  new Car(road.getLaneCenter(0), -400, 30, 50, 'DUMMY'),
  new Car(road.getLaneCenter(1), -500, 30, 50, 'DUMMY'),
]

function animate() {
  for(let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  
  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;
  
  ctx.save();
  ctx.translate(0, -car.y+canvas.height * 0.7)

  road.draw(ctx);
  car.draw(ctx);
  for(let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  requestAnimationFrame(animate);
}

animate()