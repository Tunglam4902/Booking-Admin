const numbers = [1, 2, 3, 4, 5,6];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 1);

console.log(sum); // Output: 15