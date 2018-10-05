/* const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

const text = 'Hello RSA!';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted); */
var ursa = require('ursa');
var key = ursa.generatePrivateKey(1024, 65537);
var privkeypem = key.toPrivatePem();
var pubkeypem = key.toPublicPem();

console.log(privkeypem.toString('ascii'));
console.log(privkeypem.toString('ascii'));
//console.log(pubkeypem.toString('ascii'));