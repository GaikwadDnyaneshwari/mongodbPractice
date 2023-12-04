const https = require("https");

const hostname = "127.0.0.1";
const port = 3001;
const url = `https://${hostname}:${port}/`;

const request = https.request(url, (response) => {
  let data = "Shikhar Dhawan";

  response.on("end", () => {
    const body = data;
    console.log(body);
  });
});

request.on('error', (err) => {
    console.error(`Error Occured : ${err}`);
})

request.end();