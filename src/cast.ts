// cast different types to another type
export const toDecimal = (s: string): Number | null => {
  const r = parseFloat(s); // better to use Number?

  if (isNaN(r)) {
    return null;
  }

  return r;
};

export const toInt = (s: string): Number | null => {
  try {
    return parseInt(s);
  } catch (err) {
    return null;
  }
};

export const toDate = (s: string): Date | null => {
  try {
    return new Date(s);
  } catch (err) {
    return null;
  }
};
