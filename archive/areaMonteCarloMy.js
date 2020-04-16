function approximateCircleArea () {
    console.log(quadratArea(quadratLength) * dotsPopulating(10000));
    console.log(Math.PI * Math.pow(radius, 2));
  }
  
//let totalDots = 10000;
  
function quadratArea(length) {
    return length *= length;
}
  
let radius = 1;
let xCircleCentre = 3;
let yCircleCentre = 3;
  
let quadratLength = 5;
  
let quadratSmallX0 = xCircleCentre - radius;
let quadratSmallX1 = xCircleCentre + radius;
  
let quadratSmallY0 = yCircleCentre - radius;
let quadratSmallY1 = yCircleCentre + radius;
  

function dotsPopulating(totalDots) {
  let amountCircleDots = 0;
  for (let i = 0; i < totalDots; i++) {
    let dotX = +(Math.random() * quadratLength).toFixed(2);
    let dotY = +(Math.random() * quadratLength).toFixed(2);
    if (dotX >= quadratSmallX0 && dotX <= quadratSmallX1) {
      if (dotY >= quadratSmallY0 && dotY <= quadratSmallY1) {
        let triangleLength1 = Math.abs(xCircleCentre - dotX);
        let triangleLength2 = Math.abs(yCircleCentre - dotY);
        let gipotenuza = Math.sqrt((Math.pow(triangleLength1, 2) + Math.pow(triangleLength2, 2)));
        if (gipotenuza < radius) {
          amountCircleDots += 1;
        }
      }
    } 
  }
  return amountCircleDots / totalDots;
}

approximateCircleArea();
