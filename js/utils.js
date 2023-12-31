const lerp = (a, b, t) => {
  return a + (b-a) * t;
}

const getIntersection = (A,B,C,D) => {
  const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (A.x - B.x) * (C.y - A.y) - (C.x - A.x) * (A.y - B.y);
  
  if(bottom != 0) {
    const u = uTop/bottom;
    const t = tTop/bottom;
    
    if(t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
      }
    }
  }
  return null
}

const polysIntersect = (poly1, poly2) => {
  for(let i = 0; i < poly1.length; i++) {
    for(let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]  
      )
      if(touch) return touch;
    }
  }
  return false
}

const roadIntersect = (car, roadside) => {
  for(let i = 0; i < car.length; i++) {
    for(let j = 0; j < roadside.length-1; j++) {
      const touch = getIntersection(
        car[i],
        car[(i + 1) % car.length],
        roadside[j],
        roadside[j+1]
      )
      if(touch) return touch;
    }
  }
}

const triggerIntersect = (car, triggers) => {
  for(let i = 0; i < car.length; i++) {
    for(let j = 0; j < triggers.length; j++) {
      const touch = getIntersection(
        car[i],
        car[(i + 1) % car.length],
        triggers[j].point1,
        triggers[j].point2
      )
      if(touch) return j;
    }
  }
  return false
}

const randCar = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]; 
}

const getRGBA = (value) => {
  const alpha = Math.abs(value);
  const R = value < 0 ? 0 : 255;
  const G = value < 0 ? 0 : 155;
  const B = value > 0 ? 0 : 255;
  return "rgba(" + R + ", " + G + ", " + B + ", " + alpha + ")";
}

function debounce(func, timeout = 4000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}