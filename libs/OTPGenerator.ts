export const generateOTP = (length = 6) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  while (result.length < length) {
    result = "0" + result;
  }
  return result;
};
