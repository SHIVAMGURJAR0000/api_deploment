const express = require("express");
const app = express();

import ServerlessHttp from "serverless-http";

let users = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

// route parameter (object)
// Query parameter (object)
// http://localhost:3000/api/UserData/7987?name=Bob&ids=1,2,3 (testing url)
app.get("/.netlify/functions/api/UserData/:id", (req, res) => {
  const { name, ids } = req.query;
  const { id } = req.params;

  // Optional: convert ids to an array
  const idArray = ids ? ids.split(",") : [];

  console.log("Queried name:", name);
  console.log("IDs:", idArray);

  users.forEach((user) => {
    if (user.name === name) {
      console.log("User found:", user);
    }
  });

  res.json({ users, requestedId: id, queriedName: name, ids: idArray });
});

const handler = ServerlessHttp(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
