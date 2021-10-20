const app = require("./../src/app");
const Task = require("./../src/models/Task");
const request = require("supertest");

const {
  newUser,
  newUser2,
  newUserId2,
  newUserId,
  task_one,
  setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create a task", async () => {
  await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${newUser.tokens[0].token}`)
    .send({
      description: "New description for testing",
      complete: true,
    })
    .expect(201);
});

test("Should get task ", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${newUser.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("Should not delete task ", async () => {
  const response = await request(app)
    .delete(`/tasks/${task_one._id}`)
    .set("Authorization", `Bearer ${newUser.tokens[0].token}`)
    .send()
    .expect(200);
  //   expect(response.body.length).toEqual(2);
  const task = await Task.findById(task_one._id);
  expect(task).toBeNull();
});
