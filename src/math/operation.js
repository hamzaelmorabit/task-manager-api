const fahrenheitToCelsius = (f) => (f - 32) / 1.8;

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      a > 0 && b > 0 ? resolve(a + b) : reject("Should be positive number");
    }, 2000);
  });
};
module.exports = { fahrenheitToCelsius, add };
