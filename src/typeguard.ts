export type Type = "string" | "number" | "boolean";

export interface StructureUnit<A = any> {
  name: keyof A;
  optional: boolean;
  type: Type | StructureUnit[];
}

export const checkField = <A>(
  e: A,
  attribute: keyof A,
  isOptional: boolean = false,
  type: Type = "string"
) => {
  const v = e[attribute];

  const isNotDefined = v === null || v === undefined;

  if (isOptional && isNotDefined) {
    return true;
  }

  if (isNotDefined) {
    return false;
  }

  if (typeof v === type) {
    return true;
  }

  return false;
};

export const verifyObject = <A>(
  e: A,
  structure: StructureUnit<A>[],
  optional: boolean = false
): boolean => {
  if (!e && optional) {
    return true;
  }

  return structure
    .map((s) => {
      if (Array.isArray(s.type)) {
        return verifyObject(e[s.name], s.type, s.optional);
      } else {
        return checkField(e, s.name, s.optional, s.type);
      }
    })
    .reduce((a, b) => a && b);
};
