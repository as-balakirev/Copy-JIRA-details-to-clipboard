let n = +(prompt ('enter a number', ''));
let result;


for (; n > 1; n--) {
    let result = true;
    for (let d = n-1; d > 1; d--) {
        if (n % d == 0) {
            result = false;
            break;
        }
    }
    if (result == true) {
        alert (`${n} is a prime number!`);
    }
    else {
        alert (`${n} is NOT a prime number!`);
    }
}