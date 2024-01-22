const router = require('express').Router()
const controller = require('../controllers/users.api')

module.exports = router

router
  .route('/')
  .get(
    controller.search
  )
  .post(
    controller.create
  )

router
  .route('/:mls_id')
  .get(
    controller.getById
  )
  .put(
    controller.update
  )
  .patch(
    controller.purchase
  )
  .delete(
    controller.remove
  )
