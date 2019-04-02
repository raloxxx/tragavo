'use strict'

module.exports = function (TidingsModel) {
  async function createOrUpdate (tiding) {
    const cond = {
      _id: tiding._id
    }
    const existingTiding = await TidingsModel.findOne(cond)

    if (existingTiding) {
      const updated = await TidingsModel.updateOne(
        cond,
        { $set: tiding }
      )
      return updated ? TidingsModel.findOne(cond) : existingTiding
      // modificar
    }

    const result = await TidingsModel.create(tiding)
    return result.toJSON()
  }

  function findById (id) {
    return TidingsModel.findById(id)
  }

  function findByAuthorUuid (uuid) {
    return TidingsModel.find(
      { authorId: uuid })
  }

  function findAll () {
    return TidingsModel.find(
      null,
      null,
      { sort: { createdAt: 1 } }// options: -1, 1
    )
  }

  function findByLocation (coordinates, distance) {
    return TidingsModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates
          },
          $maxDistance: distance * 1609.34
        }
      }
    })
  }

  function findByTags (tags) {
    return TidingsModel.find({
      tags: { $in: tags } // options : $all, $nin, $in
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    findByAuthorUuid,
    findByLocation,
    findByTags
  }
}

// Metodos a implementar
// findByFeatured () {}
