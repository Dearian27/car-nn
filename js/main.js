const carCanvas = document.getElementById('carCanvas');
carCanvas.height = window.innerHeight;
carCanvas.width = 260;

const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.height = window.innerHeight;
networkCanvas.width = 300;

const networkCtx = carCanvas.getContext('2d');
const carCtx = carCanvas.getContext('2d');

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(2), 100, 30, 50, 'AI', 11);
// const car = new Car(road.getLaneCenter(2), 100, 30, 50, 'KEYS', 11);

const traffic = [
  // new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY'),
  // new Car(road.getLaneCenter(3), -400, 30, 50, 'DUMMY'),
  new Car(road.getLaneCenter(2), 0, 30, 50, 'DUMMY'),
  // new Car(road.getLaneCenter(3), -250, 30, 50, 'DUMMY'),
  // new Car(road.getLaneCenter(0), -150, 30, 50, 'DUMMY'),
  // new Car(road.getLaneCenter(0), -400, 30, 50, 'DUMMY'),
  // new Car(road.getLaneCenter(1), -500, 30, 50, 'DUMMY'),
]

function animate() {
  for(let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  
  car.update(road.borders, traffic);
  carCanvas.height = window.innerHeight;
  
  carCtx.save();
  carCtx.translate(0, -car.y+carCanvas.height * 0.7)

  road.draw(carCtx);
  car.draw(carCtx);
  for(let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  requestAnimationFrame(animate);
}

animate()