const { User } = require("../models/User")

const registerGetController = (req, res) => {
  res.render('pages/home/register')
}
const registerPostController = async (req, res) => {
  let username = req.body['registration[username]'];
  let email = req.body['registration[email]'];
  let password = req.body['registration[password]'];
  let data = await User.create({
    username, email, password
  })
  res.redirect('/login');
}

module.exports = {
  registerGetController,
  registerPostController
}
