const { is } = require("express/lib/request");
const res = require("express/lib/response");
const fs = require("fs");
const { load } = require("nodemon/lib/config");

const loadUsers = () => {
  try {
    const buffer = fs.readFileSync("./users.json");
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const addUser = (id) => {
  try {
    if (typeof id !== "number") {
      throw Error("Please enter id as a number.");
    }
    if (!isValidNumber(id)) {
      throw Error("This id is not a valid number.");
    }
    const users = loadUsers();
    if (users.find((user) => user.id === id)) {
      throw Error("This user is already exist, no duplicates.");
    }
    users.push({ id, cash: 0, credit: 0, isActive: true });
    saveUsers(users);
    return { id, cash: 0, credit: 0, isActive: true };
  } catch (e) {
    return e.message;
  }
};

const isValidNumber = (idNum) => {
  return Number.isInteger(idNum) && idNum >= 0;
};

const saveUsers = (users) => {
  const usersJson = JSON.stringify(users); // converts a Js object to a JSON string
  fs.writeFileSync("./users.json", usersJson);
};

const isValidId = (id) => {
  const idnum = +id; //check id params????
  return idnum > 0 && Number.isInteger(idnum);
};

const depositUp = (id, deposit) => {
  try {
    if (deposit < 0) {
      throw Error("deposit should be positive.");
    }
    if (!isValidId(id)) {
      throw Error("id is not valid.");
    }
    const users = loadUsers();
    const foundUser = users.find((user) => user.id == id);
    if (!foundUser) {
      throw Error("User not found");
    }
    if (!foundUser.isActive) {
      throw Error("User is not active");
    } else {
      foundUser.cash = Number(foundUser.cash) + Number(deposit);
      saveUsers(users);
      return foundUser;
    }
  } catch (e) {
    return e.message;
  }
};

const credit = (id, money) => {
  const users = loadUsers();
  try {
    if (!isValidId(id)) {
      throw Error("id is not valid.");
    }
    const foundUser = users.find((user) => user.id === id);
    if (credit < 0) {
      throw Error("Credit cannot be negative.");
    }
    if (!foundUser) {
      throw Error("User not found");
    }
    if (!foundUser.isActive) {
      throw Error("User is not active");
    } else {
      foundUser[credit] = money;
      saveUsers(users);
      return foundUser;
    }
  } catch (e) {
    return e.message;
  }
};

const withdraw = (id, money) => {
  try {
    const users = loadUsers();
    const foundUser = users.find((user) => user.id === id);
    if (!isValidId(id)) {
      throw Error("id user is not valid.");
    } else if (!foundUser) {
      throw Error("User not found");
    }
    if (!foundUser.isActive) {
      throw Error("User is not active");
    }
    if (foundUser.cash + foundUser.credit < money) {
      throw Error("There's no enough money");
    }
    if (!isValidNumber(money)) {
      throw Error("money amount is not valid.");
    }
    foundUser.cash = foundUser.cash - money;
    saveUsers(users);
    return foundUser;
  } catch (e) {
    return e.message;
  }
};

const transfer = (money, reciver, id) => {
  try {
    const users = loadUsers();
    const foundUser = users.find((user) => user.id == id);
    if (!foundUser) {
      throw Error("User not found");
    }
    if (!foundUser.isActive) {
      throw Error("User is not active");
    }
    const foundReciver = users.find((user) => user.id == reciver);
    if (!foundReciver) {
      throw Error("Reciver not found");
    }

    if (money < 0) {
      throw Error("money amount should be positive.");
    }
    if (!isValidNumber(money)) {
      throw Error("money amount is not valid.");
    }
    if (foundUser.cash + foundUser.credit < money) {
      throw Error("transfer is not approved. no enough money.");
    }
    if (foundUser && foundReciver) {
      foundUser.cash -= money;
      foundReciver.cash += money;
      saveUsers(users);
      return { foundReciver, foundUser };
    }
  } catch (e) {
    return e.message;
  }
};

const filter = (amount, type) => {
  const users = loadUsers();
  return users.filter((user) => user[type] >= amount);
};

const filterActive = (amount) => {
  const users = loadUsers();
  return users.filter((user) => user.isActive && user.cash >= amount);
};

module.exports = {
  loadUsers,
  addUser,
  depositUp,
  credit,
  withdraw,
  transfer,
  filter,
  filterActive,
};
