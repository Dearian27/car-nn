class Road {
  constructor(x, width, laneCount=4) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x-width/2;
    this.right = x+width/2;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    this.borders = [
      [
        {x: this.left, y: this.top},
        {x: this.left, y: this.bottom},
      ],
      [
        {x: this.right, y: this.top},
        {x: this.right, y: this.bottom},
      ]
    ]
  }

  getLaneCenter(laneIndex) {
    const lineWidth = this.width / this.laneCount;
    return this.left + lineWidth / 2 + Math.min(laneIndex, this.laneCount-1) * lineWidth;
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for(let i=1; i < this.laneCount; i++) {
      const x = lerp(
        this.left,
        this.right,
        i / this.laneCount
      )
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    this.borders.forEach(border => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    })
  }
}