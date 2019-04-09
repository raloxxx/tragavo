'use strict'

module.exports = function (RestaurantModel) {
  async function createOrUpdate (restaurant) {
    const cond = {
      _id: restaurant._id
    }
    const existingRestaurant = await RestaurantModel.findOne(cond)

    if (existingRestaurant) {
      const updated = await RestaurantModel.updateOne(
        cond,
        { $set: restaurant }
      )
      return updated ? RestaurantModel.findOne(cond) : existingRestaurant
    }

    const result = await RestaurantModel.create(restaurant)

    return result.toJSON()
  }

  function findById (id) {
    return RestaurantModel.findById(id)
  }

  function findByCountry (country) {
    return RestaurantModel.find({ country: country })
  }

  function findByCity (city) {
    return RestaurantModel.find({
      city
    })
  }

  function findByCategories (categories) {
    return RestaurantModel.find({
      categories: { $in: categories }
    })
  }

  function findAll () {
    return RestaurantModel.find()
  }

  return {
    createOrUpdate,
    findById,
    findByCountry,
    findByCity,
    findByCategories,
    findAll
  }
}

// metodos a implementar
// -> findByQualification
