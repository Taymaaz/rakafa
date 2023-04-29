export const phoneNumberValidator = (value: string): boolean => {
  if (value.length != 11 && value.length != 10) return false;
  try {
    var res = Number(value);
    return true;
  } catch {
    return false;
  }
};
