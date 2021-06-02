const http = require("http");
const fs = require("fs");
const path = require("path");
const config = require("./config/config");

const { PORT } = config;

const server = http.createServer((req, res) => {
  //   Route to pages
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "pages", "home.html"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
  } else if (req.url === "/about") {
    fs.readFile(path.join(__dirname, "pages", "about.html"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
  }
});

server.listen(PORT, `localhost`, () => {
  console.log(`Server started at port: ${PORT}`);
});
