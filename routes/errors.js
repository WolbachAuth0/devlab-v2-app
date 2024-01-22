const router = require('express').Router()
const { requiresAuth } = require('./../middleware/auth')
const controller = require('./../controllers/errors')

module.exports = router

router
  .route('/')
  .all(
    controller.notFoundError
  )
