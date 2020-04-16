let {hello, constFromA} = require('./a.js');
let y = require('./b.js');

console.log(constFromA);

hello();

y();