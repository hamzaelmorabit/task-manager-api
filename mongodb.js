// CRUD create read update delete
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// console.log(new ObjectID());
const id = new ObjectID();
// console.log(id.getTimestamp());
// console.log(id.toHexString().toString());
// console.log(id.id);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database");
      return;
    }
    console.log("Connected correctly ");

    const db = client.db(databaseName);
    const data_user = [
      {
        _id: id,
        description: "Task is not ready completed",
        completed: false,
      },
      {
        description: "Task is  already completed!!!",
        completed: false,
      },
    ];

    /*   db.collection("tasks").insertMany(data_user, (error, result) => {
      if (error) {
        console.log("error", error);
        return;
      }
     
    }); 
    
        // db.collection("users").insertOne({
    //   name: "Hamza",
    //   age: 24,
    // });
    */
    /*   Find element 
    // db.collection("users")
    //   .find({ name: "Hamza" })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    const responseFind = db
      .collection("users")
      .findOne(
        { _id: new ObjectID("614ba10e945d5ccf99b85dea") }
        // ,
        // (error, user) => {
        //   if (!user) {
        //     return console.log(user);
        //   }
        //   console.log(user, "user");
        // }
      );
    responseFind.then((response) => {
      console.log(response);
    });

    // db.collection("users")
    //   .find({ completed: false })
    //   .count((error, users) => {
    //     console.log(users);
    //   }); */

    db.collection("tasks")
      .deleteOne({ description: "Task is not ready completed" })
      .then((res) => {
        console.log("Delete successful", res);
      })
      .catch((error) => console.log("Delete Erorr", error));

    db.collection("users")
      .updateOne(
        {
          _id: new ObjectID("614ba10e945d5ccf99b85de9"),
        },
        {
          $set: {
            //$inc increment by 222
            age: 222,
          },
        }
      )
      .then((res) => console.log("Successful", res))
      .catch((error) => console.log("Erorr", error));

    db.collection("users")
      .updateMany({ age: { $gt: 4 } }, { $set: { age: 20 } })
      .then((res) => console.log("Successful updateMany", res))
      .catch((error) => console.log("Erorr updateMany", error));

    // db.collection("users")
    //   .updateMany({ completed: false }, { $set: { age: 2220 } })
    //   .then((res) => console.log("Successful updateMany", res))
    //   .catch((error) => console.log("Erorr updateMany", error));
  }
);
