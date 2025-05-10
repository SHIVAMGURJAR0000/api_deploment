const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

let users = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

// route parameter (object)
// Query parameter (object)
// http://localhost:3000/api/UserData/7987?name=Bob&ids=1,2,3 (testing url)
app.get("/api/UserData/:id", (req, res) => {
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

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Bajaj API Challenge!");
});

//get req
app.post("/api/data", (req, res) => {
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
    user_id: "your_user_id_here",
    email_id: "your_email@example.com",
    college_roll_number: "your_roll_number_here",
    numbers,
    alphabets,
  });
});

//GET
app.get("/api/detail", (req, res) => {
  res.json({
    name: "Shivam Gurjar",
    "Enroll-no": "0827CY221057",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//deploy on netlify
// npm install express serverless-http netlify-cli netlify-lambda
