const crypto = require('crypto');

module.exports.encryptString = (string, salt = "CUSTOM_SALT") => {
  return crypto.createHash('sha256')
    .update(string, "utf8")
    .update(makeHash(salt))
    .digest("base64");
}

function makeHash(val) {
  return crypto.createHash('sha256').update(val, "utf8").digest();
}

module.exports.CustomError = class CustomError extends Error {
  constructor(...params) {
    super(...params);
  }
}
