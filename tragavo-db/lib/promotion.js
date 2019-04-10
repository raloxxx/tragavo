'use strict'

module.exports = function(PromotionModel) {
    async function createOrUpdate(promotion) {
        const cond = {
            _id: promotion._id
        }
        const existingPromotion = await PromotionModel.findOne(cond)

        console.log("fhf", existingPromotion)

        if (existingPromotion) {
            const updated = await PromotionModel.updateOne(
                cond, { $set: promotion }
            )
            return updated ? PromotionModel.findOne(cond) : existingPromotion
                // modificar
        }

        const result = await PromotionModel.create(promotion)
        return result.toJSON()
    }

    function findByAuthorUuid(uuid) {
        return PromotionModel.find({ authorId: uuid })
    }

    function findAll() {
        return PromotionModel.find(
            null,
            null, { sort: { createdAt: 1 } } // options: -1, 1
        )
    }

    function findById(id) {
        return PromotionModel.findById(id)
    }

    function findByTags(tags) {
        return PromotionModel.find({
            tags: { $in: tags } // options : $all, $nin, $in
        })
    }

    return {
        createOrUpdate,
        findAll,
        findById,
        findByAuthorUuid,
        findByTags
    }
}