'use strict'

const setupDatabase = require('./lib/db')
const setupEventsModel = require('./models/event')
const setupRestaurantModel = require('./models/restaurant')

const setupPromotionModel = require('./models/promotion')
const setupPromotion = require('./lib/promotion')
const setupEvents = require('./lib/event')
const setupRestaurant = require('./lib/restaurant')
const defaults = require('defaults')

module.exports = async function(uri, config) {
    config = defaults(config, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        // autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    })

    const mongoose = await setupDatabase(uri, config)
    const EventsModel = await setupEventsModel(uri, config)
    const RestaurantModel = await setupRestaurantModel(uri, config)

    const PromotionModel = await setupPromotionModel(uri, config)

    if (config.setup) {
        await mongoose.connection.db.dropDatabase() // eliminamos la base de datos :( :( :(
    }

    const Event = setupEvents(EventsModel)
    const Restaurant = setupRestaurant(RestaurantModel)
    const Promotion = setupPromotion(PromotionModel)

    return {
        Event,
        Restaurant,
        Promotion
    }
}