const products = require("../models/data.json");

test("does not return null", () => {
  expect(products).not.toBe(null);
});

test("return truthy value", () => {
  expect(products).toBeTruthy();
});
