// File Handling in Node JS

var fs = require("fs");

fs.appendFile("name.txt", "Sanju Samson", function (err) {
  if (err) throw err;
});
