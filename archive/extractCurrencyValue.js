function extractCurrencyValue (text) {
  if (text[0].includes(`\$`)) {
    return isNumber (text);
  }
}

function isNumber(valueToCheck) {
  return isFinite(valueToCheck.slice(1)) ? Number(valueToCheck.slice(1)) : "it is not a currency!" 
}

console.log (extractCurrencyValue('$432a'));
