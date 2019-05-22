const express = require("express");
const db = require("./data/accounts-model.js");
const server = express();
server.use(express.json());

server.get("/accounts", async (req, res) => {
  try {
    const accounts = await db.find(req.query);
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving accounts." });
  }
});

server.get("/accounts/:id", async (req, res) => {
  try {
    const account = await db.findById(req.params.id);
    if (account) {
      res.status(200).json(account);
    } else {
      res
        .status(404)
        .json({ message: "The account with specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving account information." });
  }
});

server.post("/accounts", async (req, res) => {
  try {
    const account = await db.add(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: "Error adding account," });
  }
});

server.put("/accounts/:id", async (req, res) => {
  const account = req.body;

  try {
    const update = await db.update(req.params.id, account);
    if (update) {
      res.status(200).json({ message: "The account has been updated." });
    } else {
      res.status(404).json({ message: "The accoutn could not be found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating the account." });
  }
});

server.delete("/accounts/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count) {
      res.status(200).json({ message: "Account has been deleted" });
    } else {
      res.status(400).json({ message: "Account could not be found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting account." });
  }
});

module.exports = server;
