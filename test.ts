class Shape {
  getArea() {}
}

class Reactangle extends Shape {
  getArea() {
    return 100;
  }
}

class Circle extends Shape {
  getArea() {
    return 200;
  }
}

var r = new Reactangle();
var c = new Circle();

function calcArea(shape: Shape) {
  console.log(shape.getArea());
}

calcArea(c);
calcArea(r);
