export function isFormInputEmpty(object) {
  for (let key in object) {
    if (typeof object[key] === "string") {
      if (object[key].toString().trim() === "") {
        return true;
      }
    } else if (object[key] === null || object[key] === undefined) {
      return true;
    }
  }
  return false;
}

export function isEmailCorrectFormat(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return !emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^(0[1-9])+([0-9]{8,9})\b/;
  return !phoneRegex.test(phoneNumber);
}
