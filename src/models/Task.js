const mongoose = require("mongoose");
const schemaTask = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    complete: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", schemaTask);
module.exports = Task;
