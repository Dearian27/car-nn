class Car {
  constructor(x, y, width, height, controlType, maxSpeed = 3) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
    this.polygon = [];
    this.image = randCar(playerCars);
    this.damaged = false;
    
    this.speed = 0;
    this.maxSpeed = maxSpeed;
    this.maxBackSpeed = -2;

    this.angle = 0;

    this.useBrain = controlType == 'AI';
    if(controlType !== 'DUMMY') {
      this.sensor = new Sensor(this);
      this.brain = new NeuralNetwork(
        [this.sensor.rayCount, 6, 4]
      );
    }
    this.controls = new Controls(controlType);
  }
  #createPolygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points;
  }
  #move() {
    //movement
    if(this.controls.space) {
      if (this.speed < 0) {
        if(this.speed <= 1.5) this.speed -= this.speed/10;
        else this.speed -= this.speed/20;
      } else if (this.speed > 0) {
        if(this.speed >= 3) this.speed -= this.speed/20;
        else this.speed -= this.speed/10;
      }
    }
    else if(this.controls.forward) {
      this.speed = (this.speed * 10 + 1) / 10 > this.maxSpeed ? this.maxSpeed : (this.speed * 10 + 1) / 10;
    } else if(this.controls.reverse) {
      this.speed = (this.speed * 10 - 1) / 10 <  this.maxBackSpeed ? this.maxBackSpeed : (this.speed * 10 - 1) / 10;
    } else if (this.speed < 0) {
      this.speed = (this.speed * 100 + 7) / 100;
    } else if (this.speed > 0) {
      this.speed = (this.speed * 100 - 7) / 100;
    }
    if(Math.abs(this.speed) < 0.09) this.speed = 0;

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
    
    // rotate
    if(this.controls.left) {
      if(this.speed > 0.3) this.angle += 0.027;
      else if(this.speed < -0.3) this.angle -= 0.027;
    } 
    if(this.controls.right) {
      if(this.speed > 0.3) this.angle -= 0.027;
      else if(this.speed < -0.3) this.angle += 0.027;
    }
  }
  update(roadBorders, traffic) {
    if(!this.damaged) {
      this.#move();
      this.polygon = this.#createPolygon();
      this.damaged = this.assessDamage(roadBorders, traffic);
    }

    if(this.sensor) {
      this.sensor.update(roadBorders, traffic);
      const offsets = this.sensor.readings.map(
        s => s == null ? 0 : 1 - s.offset
      )
      const outputs = NeuralNetwork.feedForward(offsets, this.brain);
      if(this.useBrain) {
        this.controls.forward = outputs[0];
        this.controls.left = outputs[1];
        this.controls.right = outputs[2];
        this.controls.reverse = outputs[3];
      }
    }
  }
  assessDamage(roadBorders, traffic) {
    for(let i = 0; i < roadBorders.length; i++) {
      if(polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    for(let i = 0; i < traffic.length; i++) {
      if(polysIntersect(this.polygon, traffic[i].polygon)) {
        setTimeout(() => window.location.reload(), 1400)
        return true;
      }
    }
    return false;
  }

  draw(ctx) {
    if(this.damaged) {
      ctx.fillStyle = 'gray';
    } else ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for(let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();

    this.sensor?.draw(ctx);
  }
}
