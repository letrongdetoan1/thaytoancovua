const homeController = (req, res) => {
  if (req.session.userId) {
    res.render('pages/home/hometoilam')
  }
  res.redirect('/login');
}

module.exports = {
  homeController
}
