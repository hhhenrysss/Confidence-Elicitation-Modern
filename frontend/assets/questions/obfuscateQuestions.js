const sjcl = require('sjcl');
const fs = require('fs');

const str = fs.readFileSync('shortenedSubjective.json', "utf8");
const encrypted = sjcl.encrypt("Confidence Elicitation", str);
fs.writeFileSync('./obfuscated.txt', encrypted);