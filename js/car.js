class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
    
    this.speed = 0;
    this.maxSpeed = 11;
    this.maxBackSpeed = -2;

    this.angle = 0;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }
  #createPolygon() {
    
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
      if(this.speed > 0.3) this.angle += 0.03;
      else if(this.speed < -0.3) this.angle -= 0.03;
    } 
    if(this.controls.right) {
      if(this.speed > 0.3) this.angle -= 0.027;
      else if(this.speed < -0.3) this.angle += 0.027;
    }
  }
  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.rect(
      -this.width/2,
      -this.height/2,
      this.width,
      this.height
    );
    ctx.fill();
    ctx.restore();

    this.sensor.draw(ctx);
  }
}