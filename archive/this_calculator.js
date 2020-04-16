function Calculator (){
  this.read = function (){
      this.a = +prompt('enter number a');
      this.b = +prompt ('enter number b');
    }
  this.sum = function () {
    return this.a + this.b;
     
  }
  this.mul = function() {
    return this.a * this.b;
  }
}

//let test = new Calculator;
//test.read();
//test.sum();
//test.mul();

let vasya = new Calculator;
vasya.read();
alert ("Sum = " + vasya.sum());
//alert ("Mul = " + vasya.mul());