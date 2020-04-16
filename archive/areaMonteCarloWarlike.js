function areaCircleMonteCarlo (radius, accuracy) {
  let quadrat = defineQuadrat(radius);
  let pointCounter = 0;
  for ( let i = 0; i < accuracy; i++) {
    let point = randomPoint(quadrat);
    if (isInsideCircle (point, radius)) {
      pointCounter++;
    }
  }
  return pointCounter / accuracy * quadrat.area();
}

/**
 * 
 * @param {number} radius
 * @returns quadrat object containing top left coorditane and length of the quadrat 
 */
function defineQuadrat(radius) {
  let y = radius;
  let x = -radius;
  let length = radius * 2;
  let quadrat = {
    y,
    x,
    length,
    area: function() {
      return this.length ** 2;
    }
  }
  return quadrat;
}

function randomPoint (quadrat) {
  let x = randomNumber(quadrat.x, quadrat.x + quadrat.length);
  let y = randomNumber(quadrat.y - quadrat.length, quadrat.y);
  return {x, y, };
}

function randomNumber(low, high) {
  return Math.random() * (high - low) + low;
}

function isInsideCircle (point, radius) {
  let x1 = 0;
  let y1 = 0;
  let x2 = point.x;
  let y2 = point.y;
  let d = Math.sqrt (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return d <= radius;
}


function areaCircleMath(radius) {
  return Math.PI * Math.pow(radius, 2);
}

console.log (areaCircleMonteCarlo(3, 100000));
console.log (areaCircleMath(3));