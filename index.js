console.log("Application started");

const http = require("http");

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello World</h1>");
});