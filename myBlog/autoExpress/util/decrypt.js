const fs = require('fs');
const crypto = require('crypto');

function decrypt(password) {
    let privateKey = fs.readFileSync('./pem/private.pem', 'utf8');
    let buffer2 = new Buffer(password,'base64');
    let decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING // 注意这里的常量值要设置为RSA_PKCS1_PADDING
        },
        buffer2
    )
    return decrypted.toString('utf-8');
}

let EncryptS = (data, key) => {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

let DecryptS = (encrypted, key) => {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


module.exports = {
    decrypt,
    EncryptS,
    DecryptS
};