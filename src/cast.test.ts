import * as Cast from "./cast";

test("to decimal", () => {
  const d1 = Cast.toDecimal("12.3");
  const d2 = Cast.toDecimal("not a number");

  expect(d1).toEqual(12.3);
  expect(d2).toEqual(null);
});

test("to int", () => {
  expect(Cast.toInt("3")).toEqual(3);

  // expect(Cast.toInt('a')).toEqual(null);
});

test("to date", () => {
  expect(Cast.toDate("2019-03-04")).toEqual(new Date("2019-03-04"));
  // expect(Cast.toDate('2019-sdf03-04')).toEqual(null);
});
