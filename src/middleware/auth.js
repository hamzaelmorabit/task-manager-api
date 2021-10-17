const jwt = require("jsonwebtoken");
const User = require("./../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    // console.log(decoded._id);

    // console.log(user);
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).send({ error: "Please Authenticate" });
  }
};
module.exports = auth;
