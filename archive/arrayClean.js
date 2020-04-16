function aclean(values) {
  values.forEach((element, index) => {
    for (let i = index + 1; i < values.length; i ++) {
      if (isAnagrams(element, values[i])) {
        values.splice(i, 1);
      }
    }
  });
  return values;
}


function isAnagrams (word1, word2) {
  if (word1.length != word2.length) {
    return false;
  }
  let arr1 = Array.from(word1).sort();
  let arr2 = Array.from(word2).sort();
  return arr1.join() == arr2.join();
}


let arr = ["nap", "pan", "teachers", 'ab', 'cba', 'abc', "teachers", 'hgfjdk', 'gfdsh','apn',"cheaters", "PAN", "ear", "era", "hectares"];
console.log(aclean(arr));


//console.log(isAnagrams('pan', 'nap'));