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


