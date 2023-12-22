import userService from "../service/userService";
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
  // userService.createNewUser(email, username, password);
  userService.getUserList();
  return res.send("handleCreateUser ");
};
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateUser,
};
