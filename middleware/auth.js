const { auth, requiresAuth } = require('express-openid-connect')

// OIDC middleware
const oidcMiddleware = auth({
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  baseURL: `${process.env.BASE_URL}/`,
  clientID: process.env.AUTH0_CLIENT_ID,
  secret: process.env.AUTH0_CLIENT_SECRET,
  idpLogout: true,
})

module.exports = {
  oidcMiddleware,
  requiresAuth
}