const fs = require("fs");
const filePath = "./database/user.json";

// write file
const fileWrite = (users) => {
  fs.writeFile(filePath, users, (err) => {
    if (err) throw err;
  });
};

const addUser = (user) => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);
    users.push(user);
    const userString = JSON.stringify(users, null, 2);
    fileWrite(userString);
  });
};



module.exports = { addUser };
