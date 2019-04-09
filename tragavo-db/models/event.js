'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupNewsModel (uri, config) {
  const mongoose = await setupDatabase(uri, config)

  const calendarSchema = new Mongoose.Schema({
    date: { type: Date },
    start: Number,
    end: Number
  })

  const tidingsSchema = new Mongoose.Schema({
    title: String,
    description: String,
    authorId: String,
    author: {
      name: String,
      email: String,
      url: String
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    calendar: [calendarSchema],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    comments: [{ body: String, date: Date }],
    tags: {
      type: [String]
    }
  })

  tidingsSchema.index({ location: '2dsphere' })// index para autorizar busqueda geolocalizacion

  return mongoose.model('events', tidingsSchema)
}
