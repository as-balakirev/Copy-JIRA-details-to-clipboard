function Accumulator (startingValue) {
  this.value = startingValue;
  this.read = function() {
    this.newValue = +prompt('How much to add?', 0);
    return this.value += this.newValue;
  }
}

let acc = new Accumulator(1);
acc.read();
acc.read();
alert (acc.value);