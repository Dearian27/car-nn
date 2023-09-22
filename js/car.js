class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    this.speed = 0;
    this.maxSpeed = 4;
    this.controls = new Controls();
  }
  update() {
    if(this.controls.space) {
      if (this.speed > 0) {
        if(this.speed >= 0.3) this.speed = (this.speed * 10 - 3) / 10
        else this.speed = (this.speed * 10 - 1) / 10
      } else if (this.speed < 0) {
        if(this.speed <= 0.3) this.speed = (this.speed * 10 + 3) / 10
        else this.speed = (this.speed * 10 + 1) / 10;
      }
      this.y += this.speed;
    }
    else if(this.controls.forward) {
      this.speed = (this.speed * 10 - 1) / 10;
      this.y += this.speed;
    } else if(this.controls.reverse) {
      this.speed = (this.speed * 10 + 1) / 10;
      this.y += this.speed;
    } else if (this.speed > 0) {
      this.speed = (this.speed * 10 - 1) / 10;
      this.y += this.speed;
    } else if (this.speed < 0) {
      this.speed = (this.speed * 10 + 1) / 10;
      this.y += this.speed;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x-this.width/2,
      this.y-this.height/2,
      this.width,
      this.height
    );
    ctx.fill();
  }
}