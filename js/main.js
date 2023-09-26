const carCanvas = document.getElementById('carCanvas');
carCanvas.height = window.innerHeight;
carCanvas.width = 260;
const carCtx = carCanvas.getContext('2d');

const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.height = window.innerHeight;
networkCanvas.width = 300;
const networkCtx = networkCanvas.getContext('2d');


// const car = new Car(road.getLaneCenter(2), 100,  35, 60, 'KEYS', 11);
const road = new Road(carCanvas.width/2, carCanvas.width*0.9);

const traffic = [
  new Car(road.getLaneCenter(1), -100,  35, 60, 'DUMMY'),
  new Car(road.getLaneCenter(3), -400,  35, 60, 'DUMMY'),
  new Car(road.getLaneCenter(2), 0,  35, 60, 'DUMMY'),
  new Car(road.getLaneCenter(3), -250,  35, 60, 'DUMMY'),
  // new Car(road.getLaneCenter(0), -150,  35, 60, 'DUMMY'),
  new Car(road.getLaneCenter(0), -400,  35, 60, 'DUMMY'),
  new Car(road.getLaneCenter(1), -500,  35, 60, 'DUMMY'),

   new Car(road.getLaneCenter(1), -650,  35, 60, 'DUMMY'),
   new Car(road.getLaneCenter(3), -750,  35, 60, 'DUMMY'),
  new Car(road.getLaneCenter(2), -310,  35, 60, 'DUMMY'),
   new Car(road.getLaneCenter(3), -580,  35, 60, 'DUMMY'),
  new Car(road.getLaneCenter(0), -690,  35, 60, 'DUMMY'),
   new Car(road.getLaneCenter(0), -800,  35, 60, 'DUMMY'),
   new Car(road.getLaneCenter(1), -780,  35, 60, 'DUMMY'),
]

const triggers = [];
for(let i = 0; i < 15; i++) {
  triggers.push(new Trigger(carCanvas, 0 - i * 100, 3));
}


const save = () => {
  console.log('save')
  localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
  // console.log('save', JSON.stringify(bestCar.brain));
  window.location.reload();
}
const discard = () => {
  localStorage.removeItem('bestBrain');
}

const generateCars = (N) => {
  const cars = [];
  for(let i = 0; i < N; i++) {
    cars.push(new Car(road.getLaneCenter(2), 100, 35, 60, 'AI', 11));
  }
  return cars;
}

const N = 50;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")) {
  for(let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'));
    if(i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.6);
    }
  }
}

function animate(time) {
  for(let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  
  for(car of cars) {
    car.triggerIntersection(triggers, save);
    car.update(road.borders, traffic);
  }
  const bestCar = (function() {
    const carsWithMaxCredit = cars.filter(c => c.credit === Math.max(...cars.map(c => c.credit)));
    
    if (carsWithMaxCredit.length === 1) {
      return carsWithMaxCredit[0];
    } else {
      const minYCar = carsWithMaxCredit.reduce((minY, currentCar) => {
        return currentCar.y < minY.y ? currentCar : minY;
      });
      return minYCar;
    }
  })();
  // const bestCar = function() {return cars.find(c => c.credit == Math.max(...cars.map(c => c.credit)))}();

  carCanvas.height = window.innerHeight;
  


  // networkCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  
  carCtx.translate(0, -bestCar.y+carCanvas.height * 0.7)
  road.draw(carCtx);
  
  carCtx.globalAlpha = 0.2;
  for(car of cars) {
    car.draw(carCtx);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);

  for(trigger of triggers) {
    trigger.update();
    trigger.draw(carCtx);
  }

  for(let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  carCtx.restore();

  networkCtx.lineDashOffset = -time/50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}

animate()
