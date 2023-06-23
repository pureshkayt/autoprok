const {TruckBrand} = require('../models/models')
const ApiError = require('../error/ApiError');

class TruckBrandController {
    async create(req, res) {
        const {name} = req.body
        const truck_brand = await TruckBrand.create({name})
        return res.json(truck_brand)
    }

    async getAll(req, res) {
        const truck_brands = await TruckBrand.findAll()
        return res.json(truck_brands)
    }
    async delete(req, res) {
        const {id} = req.params
        const truck_brand = await TruckBrand.destroy({where: {id}})
        return res.json(truck_brand)
    }

}

module.exports = new TruckBrandController()