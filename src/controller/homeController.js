import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleCreateUser = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  userService.createNewUser(email, username, password);
  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  console.log("check id:", req.params.id);
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser,
};
