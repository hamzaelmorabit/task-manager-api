const app = require("./../src/app");
const request = require("supertest");
const User = require("../src/models/User");
const { newUser, newUserId, setupDatabase ,
} = require("./fixtures/db")

beforeEach(setupDatabase);

test("Should singup a user", async () => {
  const response = await request(app)
    .post("/users/singup")
    .send({
      name: "hamza",
      email: "hamzamorabit123@gmail.com",
      password: "2dsdsdsdsdsd",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);

  expect(response.body).toMatchObject({
    user: {
      email: "hamzamorabit123@gmail.com",
      name: "hamza",
    },
    token: user.tokens[0].token,
  });
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({ email: newUser.email, password: newUser.password })
    .expect(200);

  const user = await User.findById(newUser._id);
  const isMatch = user.tokens[1].token === response.body.token ? true : false;

  expect(isMatch).toBeTruthy();
});

test("Should get my profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${newUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should get my profile", async () => {
  await request(app).get("/users/me").send({}).expect(500);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${newUser.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(newUserId);
  expect(user).toBeNull();
});

test("Should get unexpected my profile", async () => {
  await request(app).delete("/users/me").send().expect(500); //401
});

/* test("Should upload avatar of user", async () => {
  await request(app)
    .get("/users/me/avatar")
    .set("Authorization", `Bearer ${newUser.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
});
 */
test("Should update an user", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${newUser.tokens[0].token}`)
    .send({ age: 222, name: "updatename", email: "update@gmail.com" })
    .expect(200);

  const user = await User.findById(newUserId);
  expect(user.name).toEqual("updatename");
});

test("Should not update invalide user field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${newUser.tokens[0].token}`)
    .send({ location: "Sale" })
    .expect(400);
});
