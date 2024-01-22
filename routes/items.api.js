const router = require('express').Router()
const { requiresAuth } = require('../middleware/auth')
const controller = require('./../controllers/items.api')

router
  .route('/purchase/:sku')
  .post(
    requiresAuth(), 
    controller.purchase
  )

module.exports = router