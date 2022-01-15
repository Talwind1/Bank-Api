const express = require("express");
const app = express();
app.use(express.json());
const {
  loadUsers,
  addUser,
  depositUp,
  credit,
  withdraw,
  transfer,
} = require("./utils");

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.get("/users", (req, res) => {
  try {
    res.status(200).send(loadUsers());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/users", (req, res) => {
  try {
    const { id } = req.body;
    res.status(201).send(addUser(id));
  } catch (e) {
    req.status(400).send(e.message);
  }
});

app.put("/users/deposit/:id", (req, res) => {
  // check deposit
  const deposit = req.body.deposit;
  const id = req.params.id;
  try {
    res.status(200).send(depositUp(id, deposit));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.put("/users/withdraw/:id", (req, res) => {
  // check deposit
  const money = req.body.money;
  const id = req.params.id;
  try {
    res.status(200).send(withdraw(id, money));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.put("/users/credit/:id", (req, res) => {
  // check deposit
  const money = req.body.money;
  const id = req.params.id;
  try {
    res.status(200).send(credit(id, money));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.put("/users/transfer/:id", (req, res) => {
  // check deposit
  const money = req.body.money;
  const reciver = req.body.reciver;
  const id = req.params.id;
  try {
    res.status(200).send(transfer(money, reciver, id));
  } catch (e) {
    res.status(400).send(e.message);
  }
});
