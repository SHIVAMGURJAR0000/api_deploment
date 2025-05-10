const express = require("express");
const app = express();

import ServerlessHttp from "serverless-http";

let users = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

let count = 0;

// route parameter (object)
// Query parameter (object)
// http://localhost:3000/api/UserData/7987?name=Bob&ids=1,2,3 (testing url)
app.get("/.netlify/functions/api/UserData/:id", (req, res) => {
  count++;
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

  res.json({
    users,
    requestedId: id,
    queriedName: name,
    ids: idArray,
    hitCount: count,
  });
});

app.post("/.netlify/functions/api/TestData", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ status: "error", message: "Data must be an array." });
  }

  const numbers = [];
  const alphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else {
      alphabets.push(item);
    }
  });

  res.status(200).json({
    status: "success",
    user_id: "Shivam_Gurjar_07042003",
    email_id: "shivamgurjar220386@acropolis.in",
    college_roll_number: "0827CY221057",
    numbers,
    alphabets,
  });
});

const handler = ServerlessHttp(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
