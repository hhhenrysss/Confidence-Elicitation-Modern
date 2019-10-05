var sjcl = require('sjcl');
var fs = require('fs');

var str = fs.readFileSync('shortenedSubjective.json', "utf8");
var encrypted = sjcl.encrypt("Confidence Elicitation", str);
fs.writeFileSync('./obfuscated.txt', encrypted);