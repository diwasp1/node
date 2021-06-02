const fs = require("fs");
const path = require("path");
let fileRead;
let fileDelete;
let dirDelete;

// make a new folder

fs.mkdir(path.join(__dirname, "test"), {}, (err) => {
  if (err) throw err;
  console.log("test folder created");
});

// creating a "hello.txt" file inside test folder
fs.writeFile(
  path.join(__dirname, "/test", "hello.txt"),
  "hello world",
  {},
  (err) => {
    if (err) throw err;
    console.log("file created: 'hello.txt' ");
    fileRead();
  }
);

// read file
fileRead = () => {
  fs.readFile(path.join(__dirname, "/test", "hello.txt"), (err, data) => {
    if (err) throw err;
    console.log(`data on file: ${data}`);
    fileDelete();
    dirDelete();
  });
};

//delete file
fileDelete = () => {
  fs.unlink(path.join(__dirname, "/test", "hello.txt"), (err) => {
    if (err) throw err;
    console.log("file deleted");
  });
};

// remove directory
dirDelete = () => {
  fs.rmdir(path.join(__dirname, "test"), (err) => {
    if (err) throw err;
    console.log("folder deleted");
  });
};
