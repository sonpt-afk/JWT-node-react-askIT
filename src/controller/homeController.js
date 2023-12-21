import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateUser = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  connection.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log(results); // results contains rows returned by server
    }
  );
  return res.send("handleCreateUser ");
};
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateUser,
};
