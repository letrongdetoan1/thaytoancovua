const { User } = require("../models/User");

const loginGetController = (req, res) => {
  res.render('pages/home/login')
}
const loginPostController = async (req, res) => {
  let username = req.body._username;
  let password = req.body._password;
  let checkUser = await User.find({
    username, password
  })
  if (checkUser.length < 1) {
    res.send('tai khoan khong dung')
  } else {
    res.redirect('/home')
  }
}

module.exports = {
  loginGetController, loginPostController
}
