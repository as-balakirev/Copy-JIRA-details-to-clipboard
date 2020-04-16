let listOfProducts = ['product1', 'product2'];
let todayDay = 'Monday';

function dinner (day, cookDesire, products) {
  if (cookDesire == true) {
    if (products.length >= 3) {
      console.log (`Today is ${day}. Will cook dinner from ${products.sort((a, b) => (50 - (Math.random() * 100).toFixed(0)))}.`);
    } else console.log (`Today is ${day}. I want to cook dinner, but I don't have enough products(${products.length}) to cook. Products are left: ${products.sort((a, b) => (50 - (Math.random() * 100).toFixed(0)))}.`);
  } else console.log (`Today is ${day}. I have ${products} products, but I don't want to cook. Ordering pizza.`);
}

dinner(todayDay, true, listOfProducts);