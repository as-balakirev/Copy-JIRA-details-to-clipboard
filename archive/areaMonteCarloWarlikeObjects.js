'use strict';

function Point (x, y) {
    this.x = x;
    this.y = y;
}

Point.makeRandomPoint = function (minX, maxX, minY, maxY) {
    let randomX = Math.random() * (maxX - minX) + minX;
    let randomY = Math.random() * (maxY - minY) + minY;
    return new Point(randomX, randomY);
};

function Circle(radius) {
    this.radius = radius;
    this.isPointInside = function (point) {
        let d = Math.sqrt( point.x ** 2 + point.y ** 2);
        return d <= this.radius;
    }
}

function Quadrat(topLeftPoint, length) {
    this.topLeftPoint = topLeftPoint;
    this.length = length;
    this.getRandomPointWithin = function () {
        let min = this.topLeftPoint.x;
        let max = this.topLeftPoint.x + this.length;
        return Point.makeRandomPoint(min, max, min, max);
    };
    this.getArea = function () {
        return this.length ** 2;
    };
}

/**
 *
 * @param {Circle} circle
 * @param {number} accuracy
 */
function areaCircleMonteCarlo(circle, accuracy) {
    let topLeftPointQuadrat = new Point(-circle.radius, circle.radius);
    let quadrat = new Quadrat(topLeftPointQuadrat, circle.radius * 2);
    let pointCounter = 0;
    for (let i = 0; i < accuracy; i++) {
        if (circle.isPointInside(quadrat.getRandomPointWithin())) {
            pointCounter++;
        }
    }
    return pointCounter / accuracy * quadrat.getArea();
}

console.log(areaCircleMonteCarlo(new Circle(3), 10000000));