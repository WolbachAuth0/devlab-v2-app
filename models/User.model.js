const { Schema, model } = require('mongoose')

class User {
  constructor () {}

  get mls_id () {
    return this._id
  }

  /**
   * Formats the mongoose model as JSON for response to a request.
   * @returns {Object}
   */
  format () {
    return {
      mls_id: this._id,
      user_id: this.user_id,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      version: this.__v,
      purchase_history: this.history,
    }
  }

  /**
   * Updates the mongoose model propertied with relevant values passed to the function.
   * @param {Object} body The quote data to be updated.
   */
  purchase (item) {
    this.history.push(item)
    this.increment()
  }

  /**
   * Takes a URL query object and transforms it into a database search object.
   * 
   * @param {object} query The object returned by the express.js req.query. 
   * @returns 
   */
  static parseQuery (query) {
    const mls_id = query?._id || query?.id || query?.mls_id
    if (mls_id) {
      return { _id: mls_id }
    } else {
      return query
    }
  } 
} 

const ItemSchema = new Schema({
  name: String,
  image: String,
  sku: String,
  price: Number,
  purchaseDate: Date
})

const structure = {
  email: { type: String, trim: true },    // user email address
  user_id: { type: String, trim: true },  // auth0 Id
  history: [ ItemSchema ]                 // purchase history
}

// Schema Options - https://mongoosejs.com/docs/guide.html#options
const options = {
  timestamps: true,
}

const userSchema = new Schema(structure, options)
userSchema.alias('_id', 'mls_id')
userSchema.loadClass(User)
const UserModel = model('User', userSchema)

module.exports = UserModel
