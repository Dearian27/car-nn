class Trigger {
  constructor(canvas, point1, point2) {
    // this.x1 = point1.x;
    // this.y1 = point1.y;
    // this.x2 = point2.x;
    // this.y2 = point2.y;
    this.point1 = point1;
    this.point2 = point2;
  }

  update() {
    // this.y -= this.speed;
  }

  draw(ctx) {
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.beginPath();
    // ctx.moveTo(this.x1, this.y1);
    // ctx.lineTo(this.x2, this.y2);
    ctx.moveTo(this.point1.x, this.point1.y);
    ctx.lineTo(this.point2.x, this.point2.y);
    ctx.stroke();
  }
}