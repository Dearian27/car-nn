class Road {
  constructor(x, y) {
    this.x = x;
    this.x = y;


    this.borders = [
      [
        {x: -60, y: 100},
        {x: -60, y: 0},
        {x: -40, y: -160},
        {x: 0, y: -280},
        {x: 60, y: -400},
        {x: 180, y: -480},
        {x: 300, y: -500},
        {x: 320, y: -540},
        {x: 200, y: -530},
      ],
      [
        {x: 60, y: 100},
        {x: 60, y: 0},
        {x: 80, y: -160},
        {x: 120, y: -280},
        {x: 160, y: -340},
        {x: 260, y: -380},
        {x: 380, y: -400},
        {x: 460, y: -480},
        {x: 450, y: -640},
        {x: 320, y: -660},
        {x: 200, y: -660},
      ]
    ]
  }

  draw(ctx) {
    for(let i = 0; i < this.borders.length; i++) {
      for(let j = 0; j < this.borders[i].length; j++) {
        if(j !== this.borders[i].length-1) {
          ctx.beginPath();
          ctx.lineWidth = 5;
          ctx.strokeStyle = "orange";
          ctx.moveTo(this.borders[i][j].x, this.borders[i][j].y);
          ctx.lineTo(this.borders[i][j+1].x, this.borders[i][j+1].y);
          ctx.stroke();
        }
      }
    }

    // this.borders.forEach((side, index1) => {
    //   this.side.forEach((border, index2) => {
    //     })
    // })
  }
}