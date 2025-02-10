const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory user storage
let users = [];

// Routes
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const newUser = { id: uuidv4(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  user.name = name;
  user.email = email;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.status(204).send();
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;
