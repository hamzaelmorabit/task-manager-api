const express = require("express");
const router = new express.Router();
const Task = require("./../models/Task");
const auth = require("./../middleware/auth");
const User = require("./../models/User");

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  let limit, skip;
  if (req.query.completed) {
    match.complete = req.query.completed === "true";
  }

  if (req.query.limit || req.query.skip) {
    limit = parseInt(req.query.limit);
    limit = limit || undefined;

    skip = parseInt(req.query.skip);
    skip = skip || undefined;

    // console.log(skip, limit);
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  const user = User.findById(req.user._id);
  
  await user
    .populate({
      path: "tasks",
      match,
      options: { sort, limit, skip },
    })
    .exec(function (err, userSearch) {
      if (err) return res.status(500).send(err);
      res.send(userSearch.tasks);
    });
});

// router.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});

//     if (tasks.error) return res.status(400).send(tasks);
//     res.status(200).send(tasks);
//   } catch (e) {
//     res.send(500).send(e);
//   }
// });

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task({ description: "Hamza", complete: true });
  const task = new Task({ ...req.body, owner: req.user._id });
  // task.owner = req.user._id;
  // console.log("Post");
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
  // task
  //   .save()
  //   .then((response) => res.status(201).send(response))
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
  // console.log(req.body);
  //   res.send({ name: "hamza" });
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(req.user);
  console.log(id);
  try {
    const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });

    if (!task) return res.status(404).send("Not exist this task!");

    res.send(`Successfully deleted : ${task}`);
    /*     const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).send("Not exist this task!");
    res.send(`Successfully deleted : ${task}`); */
  } catch (error) {
    res.send(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  const isAllowedUpadted = ["description", "complete"];
  const updates = Object.keys(req.body);
  // console.log(updates);

  const everyFieldAllowed = updates.every((upateField) =>
    isAllowedUpadted.includes(upateField)
  );
  if (!everyFieldAllowed) return res.status(400).send("Field not match");

  try {
    let tasks = await Task.findOne({ _id, owner: req.user._id });

    if (tasks.error) return res.status(400).send("tasks");

    updates.forEach((update) => (tasks[update] = req.body[update]));
    await tasks.save();

    res.status(200).send(tasks);
  } catch (e) {
    res.send(500).send(e);
  }
});

module.exports = router;
