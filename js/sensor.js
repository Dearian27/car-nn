class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 200;
    this.raySpread = Math.PI / 1.5;

    this.rays = [];
    this.readings = [];
  }
  
  #castRays() {
    this.rays = [];
    for(let i = 0; i < this.rayCount; i++) {
      const rayAngle = lerp(
        this.raySpread/2,
        -this.raySpread/2,
        this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
      )+this.car.angle;
      const start = {x: this.car.x, y: this.car.y};
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength
      }
      this.rays.push([start, end])
    }
  }
  #getReadings(ray, roadBorders) {
    let touches = [];
    for(let i = 0; i < roadBorders.length; i++) {
      for(let j = 0; j < roadBorders[i].length - 1; j++) {
        const touch = getIntersection(
          ray[0],
          ray[1],
          roadBorders[i][j],
          roadBorders[i][j+1],
        );
        if(touch) {
          touches.push(touch);
        }
      }
    }

    if(touches.length == 0) {
      return null;
    } else {
      const offsets = touches.map(e => e.offset);
      const minOffset = Math.min(...offsets);
      return touches.find(e => e.offset === minOffset);
    }
  }
  update(roadBorders) {
    this.#castRays();
    this.readings = [];
    for(let i = 0; i < this.rays.length; i++) {
      this.readings.push(
        this.#getReadings(this.rays[i], roadBorders)
      )
    }
  }

  draw(ctx) {
    for(let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];
      if(this.readings[i]) {
        end = this.readings[i];
      }

      // filled
      if(this.readings[i]) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#1242F166';
        ctx.moveTo(
          this.rays[i][0].x,
          this.rays[i][0].y
        )
        ctx.lineTo(
          end.x,
          end.y
        );
        ctx.stroke();
      }

      // background
      // ctx.beginPath();
      // ctx.lineWidth = 2;
      // ctx.strokeStyle = 'grey';
      // ctx.moveTo(
      //   this.rays[i][1].x,
      //   this.rays[i][1].y
      // )
      // ctx.lineTo(
      //   end.x,
      //   end.y
      // );
      // ctx.stroke();

      //Circle
      if(this.readings[i]) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#1242F166';
        ctx.arc(end.x, end.y, 5, 0, Math.PI * 2)
        ctx.stroke();
      }
    }
  }
}