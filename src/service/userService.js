import bcrypt, { hash } from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

// get the promise implementation, we will use bluebird

var salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, username, password) => {
  let hashPassword = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashPassword]
    );
  } catch (err) {
    console.log("check error:", err);
  }
};

const getUserList = async () => {
  let users = [];
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (err) {
    console.log("check error:", error);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM users WHERE id=?",
      [id]
    );
  } catch (err) {
    console.log("check error:", err);
  }
};
const getUserById = async (id) => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "select * from users where id = ?",
      [id]
    );

    return rows;
  } catch (err) {
    console.log("check error:", error);
  }
};

const updateUser = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE users SET email = ?, username = ? WHERE id = ?",
      [email, username, id]
    );
  } catch (err) {
    console.log("check error:", err);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  getUserById,
  deleteUser,
  updateUser,
};
