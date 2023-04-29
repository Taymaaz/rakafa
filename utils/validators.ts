export default function validatePhoneNumber(phoneNumber: string): boolean {
  const regex = /^(\+98|0)?9\d{9}$/;
  return regex.test(phoneNumber);
}