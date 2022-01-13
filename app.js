const express = require("express");
const app = express();
app.use(express.json());
const {
  loadUsers,
  addUser,
  depositeUp,
  credit,
  withdraw,
  transfer,
} = require("./utils");

app.get("/users", (req, res) => {
  try {
    res.status(200).send(loadUsers());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/users", (req, res) => {
  try {
    //if passport not valid
    //if() throw;
    //const pass = req.body.passportID;

    const { passportID } = req.body;

    //  const newUser = ;
    res.status(201).send(addUser(passportID));
  } catch (e) {
    throw { error: "e.message" };
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.put("/users/deposite/:passportID", (req, res) => {
  // check deposit
  const deposite = req.body.deposite;
  const id = req.params.passportID;
  try {
    res.status(200).send(depositeUp(id, deposite));
  } catch (e) {}
});

app.put("/users/credit/:passportID", (req, res) => {
  // check deposit
  const money = req.body.money;
  const id = req.params.passportID;
  try {
    res.status(200).send(credit(id, money));
  } catch (e) {}
});

app.put("/users/transfer/:passportID", (req, res) => {
  // check deposit
  const money = req.body.money;
  const reciver = req.body.reciver;
  const passportID = req.params.passportID;
  try {
    res.status(200).send(transfer(money, reciver, passportID));
  } catch (e) {}
});
