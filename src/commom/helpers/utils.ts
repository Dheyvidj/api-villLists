import * as CryptoJS from 'crypto-js';

export function Encrypt(data: string) {
  const key = CryptoJS.enc.Latin1.parse(process.env.CRIPTO_KEY);
  const iv = CryptoJS.enc.Latin1.parse(process.env.CRIPTO_KEY);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  // console.log(encrypted.toString());w

  return encrypted.toString();
}

export function DecryptDoc(data: string) {
  const key = CryptoJS.enc.Latin1.parse(process.env.CRIPTO_KEY);
  const iv = CryptoJS.enc.Latin1.parse(process.env.CRIPTO_KEY);
  const encrypted = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  const split = encrypted
    .toString()
    .split('')
    .filter((e, index) => index % 2 !== 0)
    .join('');

  const cpf = split.replace(/(e|d)/g, (match, p1) => (p1 === 'e' ? '.' : '-'));

  return cpf.toString();
}

export function stringToDate(dateString) {
  const parts = dateString.split('/');
  const formattedDate = new Date(
    Date.UTC(parts[2], parts[1] - 1, parts[0], 0, 0, 0),
  );

  return formattedDate;
}
