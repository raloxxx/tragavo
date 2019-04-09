'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupRestaurantModel (uri, config) {
  const mongoose = await setupDatabase(uri, config)

  let restaurantSchema = Mongoose.Schema({
    name: String,
    email: String,
    phones: [],
    address: String,
    country: String,
    city: String,
    categories: {
      type: [String]
    },
    url: String,
    opinions: [],
    horary: { start: String, end: String },
    contact: String,
    branchOffices: [],
    qualification: [],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
  })

  return mongoose.model('restaurant', restaurantSchema)
}
