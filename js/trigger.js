class Trigger {
  constructor(canvas, y, speed = 3) {
    this.width = canvas.width;
    this.y = y;
    this.x = 0;
    this.speed = speed;
  }

  update() {
    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, this.y);
    ctx.lineTo(this.width, this.y);
    ctx.stroke();
  }
}