import * as R from "./regex";

test("isValid", () => {
  expect(R.isValid("^sal$", "sal")).toEqual(true);
});

test("getMatches", () => {
  expect(R.getMatches("^sal$", "sal")).toEqual(["sal"]);
});

test("getMatches 2", () => {
  expect(
    R.getMatches("(\\d+)-(\\w+)-(\\d+)", "022-abc-789 043-fgh-465")
  ).toEqual(["022-abc-789", "043-fgh-465"]);
});
