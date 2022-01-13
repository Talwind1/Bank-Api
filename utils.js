const fs = require("fs");

const loadUsers = () => {
  try {
    const buffer = fs.readFileSync("./users.json");
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const addUser = (passportID) => {
  const users = loadUsers();
  if (users.find((user) => user.passportID === passportID)) {
    throw Error("This user is already exist");
  } else {
    users.push({ passportID, cash: 0, credit: 0 });
    saveUsers(users);
    return { passportID, cash: 0, credit: 0 };
  }
};

const saveUsers = (users) => {
  const usersJson = JSON.stringify(users); // converts a Js object to a JSON string
  fs.writeFileSync("./users.json", usersJson);
};

const depositeUp = (passportID, deposite) => {
  const users = loadUsers();
  const foundUser = users.find((user) => user.passportID === passportID);
  if (!foundUser) {
    throw Error("User not found");
  } else {
    foundUser.cash += deposite;
    saveUsers(users);
    return foundUser;
  }
};

const credit = (passportID, money) => {
  const users = loadUsers();
  const foundUser = users.find((user) => user.passportID === passportID);
  if (!foundUser) {
    throw Error("User not found");
  } else {
    foundUser.credit += money;
    saveUsers(users);
    return foundUser;
  }
};

const withdraw = (passportID, money) => {
  const users = loadUsers();
  const foundUser = users.find((user) => user.passportID === passportID);
  if (!foundUser) {
    throw Error("User not found");
  } else {
    foundUser.credit -= money;
    saveUsers(users);
    return foundUser;
  }
};

const transfer = (money, reciver, passportID) => {
  const users = loadUsers();
  const foundUser = users.find((user) => user.passportID === passportID);
  const foundReciver = users.find((user) => user.passportID === reciver);
  if (foundUser && foundReciver) {
    foundUser.cash -= money;
    foundReciver.cash += money;
    saveUsers(users);
    return { foundReciver, foundUser };
  } else {
    throw Error("User not found");
  }
};
module.exports = { loadUsers, addUser, depositeUp, credit, withdraw, transfer };
