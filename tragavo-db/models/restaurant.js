'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupRestaurantModel (uri, config) {
  const mongoose = await setupDatabase(uri, config)

  let restaurantSchema = Mongoose.Schema({
    uuid: String,
    name: String,
    addres: String,
    hostname: String,
    connected: Boolean
  })

  return mongoose.model('restaurant', restaurantSchema)
}
