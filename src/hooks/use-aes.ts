import CryptoJS from "crypto-js";

const passphrase =
  "tOZq6zEwqTqpIcdHEdD67J9WKnP0dNbrdkUT97pfKq_tO1LeyRg-W0sHS-HmWRMTG0U";

const useEncrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
const useDecrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
export { useDecrypt, useEncrypt };
