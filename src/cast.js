// cast different types to another type
export const toDecimal = (s) => {
  const r = parseFloat(s); // better to use `Number`

  if (isNaN(r)) {
    return null;
  }

  return r;
};

export const toInt = s => {
  try {
    return parseInt(s);
  } catch (err) {
    return null;
  }
};

export const toDate = s => {
  try {
    return new Date(s);
  } catch {
    return null;
  }
};
