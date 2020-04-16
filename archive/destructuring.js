let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

function topSalaries (obj) {
  let topSalary = 0;
  let realMan;
  for (let [name, salary] of Object.entries(obj)) {
    if (topSalary < salary) {
      topSalary = salary;
      realMan = name;
    }
  }
  return realMan;
}


function topSalaries2 (obj) {
  let maxSalary = Object.values(obj).find(function((a, b) => );
  return maxSalary;
}


console.log(topSalaries(salaries));
console.log(topSalaries2(salaries));