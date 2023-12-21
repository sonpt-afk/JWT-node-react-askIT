const getHomepage = (req, res) => {
  res.send("Hello World vs sonit!");
};

const getWindow = (req, res) => {
  res.render("sample.ejs");
};
module.exports = {
  getHomepage,
  getWindow,
};
