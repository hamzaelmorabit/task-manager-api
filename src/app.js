const express = require("express");
require("./db/mongoose");
const routerUser = require("./router/user");
const routerTask = require("./router/task");
const jwt = require("jsonwebtoken");
const Task = require("./models/Task");
const User = require("./models/User");
const app = express();

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

const multer = require("multer");

const upload = multer({
  dest: "images",
});

app.post("/upload", upload.single("upload"), async (req, res) => {
  res.send();
});

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   res
//     .status(500)
//     .send(
//       "Site is currently down. Check back soon"
//     );
// });

// parse uncoming json for us
app.use(express.json());

app.use(routerTask);
app.use(routerUser);

module.exports = app;

/* 
const name = async () => {
  const taskSearch = Task.findById("6165ac69a8495614240fe0b3");
  await taskSearch.populate("owner").exec(function (err, taskSearch) {
    if (err) return handleError(err);
    console.log(taskSearch.owner);
    return taskSearch;
  });
};

const name2 = async () => {
  const user = User.findById("616712ec1276495434da5316");
  await user.populate("tasks").exec(function (err, userSearch) {
    if (err) return handleError(err);
    console.log(userSearch.tasks);
    return userSearch;
  });
};
 */

// const fs = require("fs");
/* const loadNote = () => {
  console.log("load")
  try {
    const buffer = fs.readFileSync("./imageBuffer.json");
    const user = buffer.toString();
    const notes = JSON.parse(user);
    console.log("element", notes);
    // notes.forEach((element) => {
    //   if (element == age) return element; 
    //   console.log(element.titlee);
    // });
    return ;
  } catch (e) {
    console.log(e)
    return [e];
  }
}; */

// loadNote();

/* 
const loadNote = () => {
  try {
    const buffer = fs.readFileSync("./data.json");
    console.log(buffer)
    const user = buffer.toString();
    return JSON.parse(user);
  } catch (e) {
    return [];
  }
};

const listNote = () => {
  const notes = loadNote();
  console.log("element",notes);
  notes.forEach((element) => {
    console.log(element.title);
  });
};

listNote() */
/* 
const pet = {
  name: "cate",
  age: 22,
};
// pet.toJSON = () => {
//   return {};
// };
// console.log(JSON.stringify(pet));

pet.toJSON = function () {
  delete this.name;
  return this;
};
console.log(JSON.stringify(pet)); */
