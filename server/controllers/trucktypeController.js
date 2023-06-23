const {TruckType} = require('../models/models')
const ApiError = require('../error/ApiError');

class TruckTypeController {
    async create(req, res) {
        const {name} = req.body
        const truck_type = await TruckType.create({name})
        return res.json(truck_type)
    }

    async getAll(req, res) {
        const truck_types = await TruckType.findAll()
        return res.json(truck_types)
    }
    async delete(req, res) {
        const {id} = req.params
        const truck_type = await TruckType.destroy({where: {id}})
        return res.json(truck_type)
    }
}

module.exports = new TruckTypeController()