const UserModel = require('./../models/User.model')

module.exports = {
  homePage,
  profilePage
}

function homePage(req, res, next) {
  const data = {
    theme: req.theme,
    title: `Home | Major League Soccer`,
    active: 'home',
    isAuthenticated: req.oidc.isAuthenticated(),
    cardImage: 'https://images.mlssoccer.com/image/private/t_editorial_landscape_12_desktop_2x/f_auto/prd-league/ipocdxrkbpszcnbd2hzg.jpg',
  }
  res.render('home', data)
}

async function profilePage (req, res, next) {
  const search = {
    $or: [
      { _id: req.oidc.user.mls_id },
      { user_id: req.oidc.user.sub }
    ]
  }
  const user = await UserModel.findOne(search)

  let userIntel
  if (user) {
    userIntel = JSON.stringify(user.format(), null, 2)
  } else {
    userIntel = JSON.stringify({ message: 'Not Found' }, null, 2)
  }
  const data = {
    theme: req.theme,
    title: `Profile | Major League Soccer`,
    active: 'profile',
    isAuthenticated: req.oidc.isAuthenticated(),
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    userIntel
  }
  res.render('profile', data)
}
