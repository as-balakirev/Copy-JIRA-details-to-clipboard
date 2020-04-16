function sumInput() {
  let sum = 0;
  let array = makeArray();
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  console.log(sum);
}

function makeArray() {
  let arr = [];
  let number = prompt('Enter a new number for array', '');
  while (numberChecker(number)) {
    arr.push(+number);
    number = prompt('Enter a new number for array', '');
  }
  return arr;
}

function numberChecker (number) {
  return (number === null || number === '') ? false : isFinite(number);
}


sumInput();