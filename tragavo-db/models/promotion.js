'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../lib/db')

module.exports = async function setupPromotionModel(uri, config) {
    const mongoose = await setupDatabase(uri, config)

    const promotionsSchema = new Mongoose.Schema({
        title: String,
        description: String,
        price: Number,
        authorId: String,
        author: {
            name: String,
            email: String,
            url: String
        },
        days: [{
            name: String,
            num: Number,
        }],
        img: String,
        createdAt: { type: Date, default: Date.now },

        tags: {
            type: [String]
        }
    })

    return mongoose.model('promotions', promotionsSchema)
}