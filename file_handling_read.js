// File Handling in Node JS

var fs = require("fs");

fs.readFile("hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }
  if (data) {
    console.log(data);
  }
});
