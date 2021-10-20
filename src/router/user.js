const express = require("express");
const router = new express.Router();
const User = require("./../models/User");
const auth = require("./../middleware/auth");
const { sendEmailCancelation } = require("./../emails/account");
router.get("/users", (req, res) => {
  //     const _id = req.params.id;
  User.find({})
    .then((users) => {
      if (users.error) return res.status(400).send(users);
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    console.log(user);
    if (!user) return res.status(400).send("Not exist");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
  // User.findById(_id)
  //   .then((user) => {
  //     if (user.error) return res.status(400).send(user.error);
  //     res.status(200).send(user);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const fieldAllowed = ["name", "age", "password", "email"];
  const isFieldAllowed = updates.every((update) =>
    fieldAllowed.includes(update)
  );

  if (!isFieldAllowed) return res.status(400).send("Not Allowed field");

  try {
    /*   const user = await User.findById(req.user._id);*/
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // if (!user) return res.status(400).send("Not exist");
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  // const id = req.params.id;
  /*   console.log(req.user);
  const user = req.user; */

  try {
    /* const userDeleted = await User.findByIdAndDelete(req.user._id);
    if (!userDeleted) return res.status(404).send("Not exist this user!");
    res.send(`Successfully deleted : ${userDeleted}`); */
    sendEmailCancelation(req.user.name, req.user.email);

    await req.user.remove();
    res.send(`Successfully deleted : ${req.user}`);
  } catch (error) {
    res.send(500).send(error.message);
  }
});

router.post("/users", async (req, res) => {
  // console.log(JSON.parse(req.body));
  //   console.log(req.body);
  //   const user = new User(req.body);
  res.send("change url to /users/singup");
  //   console.log("req");
  //   try {
  //     await user.save();
  //     res.status(201).send(user);
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  /*  user
    .save()
    .then((response) => res.status(201).send(response))
    .catch((error) => {
      res.status(400).send(error);
    }); */

  // console.log(req.body);
  // res.send({ name: "hamza" });
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findUserByIdCredentials(
      req.body.email,
      req.body.password
    );
    // console.log(user, "user");
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/users/singup", async (req, res) => {
  //   console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  const user = req.user;
  user.tokens = [];
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  const user = req.user;
  const tokenUser = req.token;

  user.tokens = user.tokens.filter((token_id) => token_id.token !== tokenUser);

  try {
    await user.save();
    res.send({ user, TokenLogout: tokenUser });
  } catch (error) {
    res.status(500).send(error);
  }
});

const multer = require("multer");
const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      console.log("is pdf");
      return cb(new Error("The file Should be documents"));
    }
    cb(undefined, true);
  },
});

router.post("/users/me/avatar", upload.single("avatar"), async (req, res) => {
  res.send();
});

router.delete(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const user = req.user;
    user.avatar = undefined;
    await user.save();
    res.send();
  }
);
const fs = require("fs");

router.get(
  "/users/:id/avatar",

  async (req, res) => {
    const user_ = await User.findById("616763ab47d3e1fbd6bb8c7b");

    // console.log(user_["avatar"].type, "kjsjfmqf");
    // fs.writeFileSync("./data.json", JSON.stringify(notes));
    
    try {
      if (!user_.avatar) {
        throw new Error("No avatar Or user not found");
      }
      res.set("Content-Type", "image/jpg");
      res.send(user_.avatar);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

module.exports = router;
