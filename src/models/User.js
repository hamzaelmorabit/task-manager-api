const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./Task");

const schemaUser = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(value + "Email is not valid");
        }
      },
    },
    age: {
      type: Number,
      required: true,
      default: 20,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 7,
      validate(value) {
        if (value.includes("password"))
          throw new Error(
            "The password field should be not including  password name !"
          );
        //   else if (value.length < 6)
        //     throw new Error(
        //       "The password field should be greater than 6 characters"
        //     );
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

schemaUser.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

schemaUser.methods.toJSON = function () {
  const user = this;
  // console.log(typeof u-----------+ser);

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

schemaUser.methods.generateAuthToken = async function () {
  const user = this;
  // console.log(user);
  const token_ = await jwt.sign(
    { _id: user._id.toString() },
    "thisismycoursetoken"
  );

  user.tokens = user.tokens.concat({ token: token_ });
  await user.save();
  return token_;
};

// schemaUser.methods.generateAuthToken2 = async function () {
//   const user = this;
//   // console.log(user);
//   const token_ = await jwt.sign({ _id: user._id }, "thisismycoursetoken");
//   user.tokens = user.tokens.concat({ token: token_ });
//   console.log(user);
//   await user.save();
// };

schemaUser.statics.findUserByIdCredentials = async (_email, _password) => {
  const userSearch = await User.findOne({ email: _email });
  // const userFind = users.find((user) => user.email == email);
  // console.log(userSearch);

  if (!userSearch) {
    throw new Error("Unable to login email not match");
  }

  const isMatch = await bcrypt.compare(_password, userSearch.password);
  // console.log(isMatch);

  if (!isMatch) {
    throw new Error("Password not match ");
  }

  return userSearch;
};
schemaUser.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashPwd = await bcrypt.hash(user.password, 8);
    user["password"] = hashPwd.toString();
  }
  // console.log("Saving password");
  next();
});

schemaUser.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", schemaUser);

module.exports = User;

// .course-module--list-item--LZf65:hover {
//     box-shadow: 0 4px 14px 0 rgb(0 0 0 / 15%);
//     -webkit-transform: translateY(-2px);
//     transform: translateY(-2px);
// }
