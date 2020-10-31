import * as TG from "./typeguard";

describe("check field", () => {
  test("string: ok", () => {
    const e = { myAttribute: "fd" };
    expect(TG.checkField(e, "myAttribute")).toEqual(true);
  });

  test("string: not ok", () => {
    const e = {};
    expect(TG.checkField(e as any, "myAttribute")).toEqual(false);
  });

  test("string: not ok2", () => {
    const e = { myAttribute: 4 };
    expect(TG.checkField(e, "myAttribute")).toEqual(false);
  });

  test("string: not ok2", () => {
    const e = { myAttribute: true };
    expect(TG.checkField(e, "myAttribute")).toEqual(false);
  });

  test("number: ok", () => {
    const e = { myAttribute: 3 };
    expect(TG.checkField(e, "myAttribute", false, "number")).toEqual(true);
  });

  test("number: not ok", () => {
    const e = {};
    expect(TG.checkField(e as any, "myAttribute", false, "number")).toEqual(
      false
    );
  });

  test("number: not ok2", () => {
    const e = { myAttribute: "4" };
    expect(TG.checkField(e, "myAttribute", false, "number")).toEqual(false);
  });

  test("number: not ok2", () => {
    const e = { myAttribute: true };
    expect(TG.checkField(e, "myAttribute", false, "number")).toEqual(false);
  });

  test("boolean: ok", () => {
    const e = { myAttribute: false };
    expect(TG.checkField(e, "myAttribute", false, "boolean")).toEqual(true);
  });

  test("boolean: ok2", () => {
    const e = { myAttribute: true };
    expect(TG.checkField(e, "myAttribute", false, "boolean")).toEqual(true);
  });

  test("boolean: not ok", () => {
    const e = {};
    expect(TG.checkField(e as any, "myAttribute", false, "boolean")).toEqual(
      false
    );
  });

  test("boolean: not ok2", () => {
    const e = { myAttribute: "4" };
    expect(TG.checkField(e, "myAttribute", false, "boolean")).toEqual(false);
  });

  test("boolean: not ok2", () => {
    const e = { myAttribute: 54 };
    expect(TG.checkField(e, "myAttribute", false, "boolean")).toEqual(false);
  });
});

interface TestStruc {
  attr1: string;
  attr2: number;
  attr3?: boolean;
}

interface TestStrucNested extends TestStruc {
  attr4: { sattr1: number; sattr2: string };
}

interface TestStrucNestedOpt extends TestStruc {
  attr4?: { sattr1: number; sattr2: string };
}
describe("verify object simple", () => {
  const s: TG.StructureUnit<TestStruc>[] = [
    { name: "attr1", type: "string", optional: false },
    { name: "attr2", type: "number", optional: false },
    { name: "attr3", type: "boolean", optional: true },
  ];
  test("a", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
    };

    expect(TG.verifyObject(e1, s)).toEqual(true);
  });

  test("b", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
      attr3: false,
    };

    expect(TG.verifyObject(e1, s)).toEqual(true);
  });

  test("b", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
      attr3: "s",
    };

    expect(TG.verifyObject(e1 as any, s)).toEqual(false);
  });
});

describe("verify object nested", () => {
  const s2: TG.StructureUnit[] = [
    { name: "sattr1", type: "number", optional: false },
    { name: "sattr2", type: "string", optional: false },
  ];
  const s: TG.StructureUnit<TestStrucNested>[] = [
    { name: "attr1", type: "string", optional: false },
    { name: "attr2", type: "number", optional: false },
    { name: "attr3", type: "boolean", optional: true },
    { name: "attr4", type: s2, optional: false },
  ];
  test("a", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
      attr4: { sattr1: 4, sattr2: "gfd" },
    };

    expect(TG.verifyObject(e1, s)).toEqual(true);
  });

  test("b", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
      attr3: false,
      attr4: { sattr1: 4, sattr2: "gfd" },
    };

    expect(TG.verifyObject(e1, s)).toEqual(true);
  });

  test("b", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
      attr3: true,
      attr4: { sattr1: "4", sattr2: "gfd" },
    };

    expect(TG.verifyObject(e1 as any, s)).toEqual(false);
  });
});

describe("verify object nested optional", () => {
  const s2: TG.StructureUnit[] = [
    { name: "sattr1", type: "number", optional: false },
    { name: "sattr2", type: "string", optional: false },
  ];
  const s: TG.StructureUnit<TestStrucNestedOpt>[] = [
    { name: "attr1", type: "string", optional: false },
    { name: "attr2", type: "number", optional: false },
    { name: "attr3", type: "boolean", optional: true },
    { name: "attr4", type: s2, optional: true },
  ];
  test("a", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
      attr4: { sattr1: 4, sattr2: "gfd" },
    };

    expect(TG.verifyObject(e1, s)).toEqual(true);
  });

  test("b", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
      attr3: false,
    };

    expect(TG.verifyObject(e1, s)).toEqual(true);
  });

  test("b", () => {
    const e1 = {
      attr1: "a string",
      attr2: 4,
      attr3: true,
      attr4: { sattr1: "4", sattr2: "gfd" },
    };

    expect(TG.verifyObject(e1 as any, s)).toEqual(false);
  });
});
