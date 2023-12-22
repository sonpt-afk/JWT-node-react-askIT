import bcrypt, { hash } from "bcryptjs";
import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

var salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = (email, username, password) => {
  let hashPassword = hashUserPassword(password);

  connection.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, hashPassword],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = () => {
  let users = [];
  connection.query("select * from users", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("check results", results);
  });
};
module.exports = {
  createNewUser,
  getUserList,
};
