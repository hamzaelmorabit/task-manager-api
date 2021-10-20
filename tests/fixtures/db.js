const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/User");
const Task = require("../../src/models/Task");

const newUserId = new mongoose.Types.ObjectId();
const newUserId2 = new mongoose.Types.ObjectId();

const newUser = {
  email: "newUser@gmail.com",
  password: "newUser)dfd",
  name: "hamza",
  _id: newUserId,
  tokens: [
    {
      token: jwt.sign({ _id: newUserId.toString() }, process.env.JWT_SECRET),
    },
  ],
};

const newUser2 = {
  email: "newUser@gmail.com",
  password: "newUser)dfd",
  name: "hamza",
  _id: newUserId2,
  tokens: [
    {
      token: jwt.sign({ _id: newUserId2.toString() }, process.env.JWT_SECRET),
    },
  ],
};

const task_one = {
  description: "This is a task one",
  complete: false,
  _id: new mongoose.Types.ObjectId(),
  owner: newUserId,
};

const task_two = {
  description: "This is a task two",
  complete: false,
  _id: new mongoose.Types.ObjectId(),
  owner: newUserId,
};

const task_three = {
  description: "This is a task three",
  complete: false,
  _id: new mongoose.Types.ObjectId(),
  owner: newUserId2,
};

const task_four = {
  description: "This is a task four",
  complete: true,
  _id: new mongoose.Types.ObjectId(),
  owner: newUserId2,
};

const setupDatabase = async () => {
  await User.deleteMany();

  await Task.deleteMany();

  await new User(newUser).save();

  await new Task(task_one).save();
  await new Task(task_two).save();
  await new Task(task_three).save();
  await new Task(task_four).save();
};
module.exports = {
  setupDatabase,
  newUserId,
  newUser,
  newUser2,
  newUserId2,
  task_one,
};
