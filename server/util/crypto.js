const crypto = require("crypto-js");

const encryptFun = (data, key) => {
  return crypto.AES.encrypt(JSON.stringify(data), key).toString();
};

// 복호화 메서드
const decryptFun = (text, key) => {
  try {
    const bytes = crypto.AES.decrypt(text, key);
    const returnText = JSON.parse(bytes.toString(crypto.enc.Utf8));
    return returnText.toString();
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = {
  encryptFun,
  decryptFun,
};
