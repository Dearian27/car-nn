const carCanvas = document.getElementById('carCanvas');
carCanvas.height = window.innerHeight;
carCanvas.width = 700;
const carCtx = carCanvas.getContext('2d');

const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.height = window.innerHeight;
networkCanvas.width = 300;
const networkCtx = networkCanvas.getContext('2d');

const inputN = document.getElementById('inputN');
if(localStorage.getItem('inputN')) {
  inputN.value = localStorage.getItem('inputN');
}
inputN.onchange = (event) => {
  inputN.value = localStorage.setItem('inputN', event.target.value);
}
let N = inputN.value;

const inputK = document.getElementById('inputK');
if(localStorage.getItem('inputK')) {
  inputK.value = localStorage.getItem('inputK');
}
inputK.onchange = (event) => {
  inputK.value = localStorage.setItem('inputK', event.target.value);
}
let K = inputK.value;

// const car = new Car(road.getLaneCenter(2), 100,  35, 60, 'KEYS', 11);
const road = new Road(0, 0);

const traffic = [
  // new Car(road.getLaneCenter(1), -100,  35, 60, 'DUMMY'),
  // new Car(road.getLaneCenter(3), -400,  35, 60, 'DUMMY'),
  // new Car(road.getLaneCenter(2), 0,  35, 60, 'DUMMY'),
  // new Car(road.getLaneCenter(3), -250,  35, 60, 'DUMMY'),
  // // new Car(road.getLaneCenter(0), -150,  35, 60, 'DUMMY'),
  // new Car(road.getLaneCenter(0), -400,  35, 60, 'DUMMY'),
  // new Car(road.getLaneCenter(1), -500,  35, 60, 'DUMMY'),

  //  new Car(road.getLaneCenter(1), -650,  35, 60, 'DUMMY'),
  //  new Car(road.getLaneCenter(3), -750,  35, 60, 'DUMMY'),
  // new Car(road.getLaneCenter(2), -310,  35, 60, 'DUMMY'),
  //  new Car(road.getLaneCenter(3), -580,  35, 60, 'DUMMY'),
  // new Car(road.getLaneCenter(0), -690,  35, 60, 'DUMMY'),
  //  new Car(road.getLaneCenter(0), -800,  35, 60, 'DUMMY'),
  //  new Car(road.getLaneCenter(1), -780,  35, 60, 'DUMMY'),
]

const triggers = [];
triggers.push(new Trigger(carCanvas, road.borders[0][2], road.borders[1][2]))
triggers.push(new Trigger(carCanvas, road.borders[0][3], road.borders[1][3]))
triggers.push(new Trigger(carCanvas, road.borders[0][4], road.borders[1][4]))
triggers.push(new Trigger(carCanvas, road.borders[0][5], road.borders[1][5]))
triggers.push(new Trigger(carCanvas, road.borders[0][6], road.borders[1][6]))
triggers.push(new Trigger(carCanvas, road.borders[0][7], road.borders[1][7]))
triggers.push(new Trigger(carCanvas, road.borders[0][7], road.borders[1][8]))
triggers.push(new Trigger(carCanvas, road.borders[0][7], road.borders[1][9]))
triggers.push(new Trigger(carCanvas, road.borders[0][8], road.borders[1][9]))
triggers.push(new Trigger(carCanvas, road.borders[0][8], road.borders[1][10]))


const save = () => {
  localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
  // console.log('save', JSON.stringify(bestCar.brain));
  // console.log(bestCar.credit, !!localStorage.getItem('bestBrain'));
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

const discard = () => {
  localStorage.removeItem('bestBrain');
}

function startTouchTimer(time = 5000) {
  touchTimer = setTimeout(save, time); 
}

function resetTouchTimer() {
  clearTimeout(touchTimer);
  startTouchTimer(5000);
}
startTouchTimer();

const generateCars = (N) => {
  const cars = [];
  // cars.push(new Car(0, 0, 35, 60, 'KEYS', 11));
  for(let i = 0; i < N; i++) {
    cars.push(new Car(0, 0, 35, 60, 'AI', 5));
  }
  return cars;
}

const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")) {
  for(let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'));
    if(i != 0) {
      NeuralNetwork.mutate(cars[i].brain, K);
    }
  }
}

function animate(time) {

  for(car of cars) {
    car.triggerIntersection(triggers);
    car.update(road.borders);
  }

  bestCar = function() {return cars.find(c => c.credit == Math.max(...cars.map(c => c.credit)))}();
  // console.log('bestCar', bestCar.credit);
  carCanvas.height = window.innerHeight;
  


  // networkCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  
  // carCtx.translate(0, -bestCar.y+carCanvas.height * 0.7)
  carCtx.translate(-bestCar.x + carCanvas.width * 0.5, -bestCar.y + carCanvas.height * 0.5);

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

// console.log(triggers)
// console.log(triggers.length)