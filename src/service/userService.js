import bcrypt, { hash } from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../model/index.js";
// get the promise implementation, we will use bluebird

var salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, username, password) => {
  let hashPass = hashUserPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (err) {
    console.log("check error:", err);
  }
};

const getUserList = async () => {
  let users = [];
  users = await db.User.findAll();
  return users;
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: {
      id: userId,
    },
  });
};
const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user.get({ plain: true });
};

const updateUser = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    }
  );
};
module.exports = {
  createNewUser,
  getUserList,
  getUserById,
  deleteUser,
  updateUser,
};
