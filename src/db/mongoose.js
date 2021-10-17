const mongoose = require("mongoose");
const validator = require("validator");
const User = require("../models/User");
mongoose.connect(
  process.env.MONGODB_URL
//  "mongodb://127.0.0.1:27017/task-manager-api"
  , {
  // useCreateIndex: true,
  // useFindAndModify: false,

  // useNewUrlParser: true,

  // useUnifiedTopology: true,

  useUnifiedTopology: true,
});

const me = new User({
  email: "Johg@gamil.com",
  name: " el morabot HZA ",

  password: "sss   qqqqq              ",
});
// me.save()
//   .then((res) => console.log("Successful", res))
//   .catch((err) => console.log("Error", err));

// const Task = mongoose.model("Task", {
//   complete: { type: Boolean },
//   description: { type: String },
// });

// const task = new Task({
//   complete: true,
//   description: "This is a first complete task",
// });

// task
//   .save()
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error));


// box-shadow: #89989b 0 3px 6px -2px hover effect; padding:3px
//     border-radius: 5px;