let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};


function multiplyNumeric (obj) {
  for (let prop in obj) {
    let isNumber = obj[prop];
    if (typeof (isNumber) == 'number'){
      obj[prop] = isNumber * 2;
    } else continue;
  }
}

multiplyNumeric (menu);


for (let prop in menu) {
  alert (menu[prop]);
}