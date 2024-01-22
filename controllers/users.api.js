const UserModel = require('../models/User.model')
const responseFormatter = require('../middleware/responseFormatter')
const { handleError } = require('../controllers/errors')

module.exports = {
  search,
  getById,
  create,
  update,
  purchase,
  remove
}

//await MyModel.find({});
async function search (req, res, next) {
  try {
    const search = UserModel.parseQuery(req.query)
    const found = await UserModel.find(search)
    
    const status = 200
    const message = `Found ${found.length} documents matching your query.`
    const data = found.map(x => x.format())
    
    const json = responseFormatter(req, res, { status, message, data })
    res.status(status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

async function getById (req, res, next) {
  try {
    const mls_id = req.params.mls_id
    const found = await UserModel.findById(mls_id)
    
    const status = found ? 200 : 404
    const message = found ? `Found document with mls_id=${mls_id}` : `Document with mls_id=${mls_id} not found.`
    const data = found ? found.format() : {}
    
    const json = responseFormatter(req, res, { status, message, data })
    res.status(status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

async function create (req, res, next) {
  try {
    // create the new document
    const document = new UserModel(req.body)
    const created = await document.save()

    const status = 201
    const message = 'Created new document.'
    const data = created.format()

    const json = responseFormatter(req, res, { status, message, data })
    res.status(status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

async function update (req, res, next) {
  try {
    // find the document to be updated
    const mls_id = req.params.mls_id
    const found = await UserModel.findById(mls_id)
    if (!found) {
      return notFound(req, res, req.body)
    }

    // if found, update the document
    found.user_id = req.body.user_id
    found.history = req.body.history
    const updated = await found.save()

    const status = 200
    const message = `Updated document with mls_id=${mls_id}`
    const data = updated.format()

    // respond to requestor
    const json = responseFormatter(req, res, { status, message, data })
    res.status(status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

async function purchase (req, res, next) {
  try {
    // find the document to be updated
    const mls_id = req.params.mls_id
    const found = await UserModel.findById(mls_id)
    if (!found) {
      return notFound(req, res, req.body)
    }

    // if found, update the document
    found.purchase(body)
    const updated = await found.save()

    const status = 200
    const message = `Updated document with mls_id=${mls_id}`
    const data = updated.format()

    // respond to requestor
    const json = responseFormatter(req, res, { status, message, data })
    res.status(status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

async function remove (req, res, next) {
  try {
    // delete the document
    const mls_id = req.params.mls_id
    const removed = await UserModel.findByIdAndRemove(mls_id)
    
    // prepare the response
    const status = 200
    const message = `Removed document with mls_id=${mls_id}`
    const data = removed.format()
    
    // respond to requestor
    const json = responseFormatter(req, res, { status, message, data })
    res.status(status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

function notFound (req, res, data) {
  const status = 404
  const message = `Document with mls_id=${req.params.mls_id} was not found.`
  const json = responseFormatter(req, res, { status, message, data })
  res.status(status).json(json)
}