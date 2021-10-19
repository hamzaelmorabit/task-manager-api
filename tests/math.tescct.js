const { fahrenheitToCelsius, add } = require("../src/math/operation");
test("Pow of number", () => {
  const powOfNumber = Math.pow(2, 3);
  expect(powOfNumber).toBe(8);
});

test("Fahrenheit To Celsius temparture", () => {
  const celsius = fahrenheitToCelsius(32);
  expect(celsius).toBe(0);
});

// test("Shoul fail", () => {
//   throw new Error("Error");
// });

/** Async */
/* test("Async function !!! ", () => {
  setTimeout(() => {
    expect(1).toBe(2);
  }, 2000);
}); */

//Must use async functions
test("Async function with await ", async () => {
  const sum = await add(2, 2);
  // console.log(sum);
  expect(sum).toBe(4);
});

test("Async function with done  ", (done) => {
  add(1, 2).then((res) => {
    expect(res).toBe(3);
    done();
  });
});

// box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 4px 6px rgb(0 0 0 / 20%);
// transition: box-shadow 83ms;
// cursor: pointer;
