const router = require('express').Router()
const { requiresAuth } = require('./../middleware/auth')
const controller = require('./../controllers/views')

router
  .route('/')
  .get(
    controller.homePage
  )

router
  .route('/profile')
  .get(
    requiresAuth(), 
    controller.profilePage
  )

module.exports = router
