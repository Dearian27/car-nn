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

const randCar = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]; 
}