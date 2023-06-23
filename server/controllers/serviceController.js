const {CarService} = require('../models/models')
const ApiError = require('../error/ApiError');

class ServiceController {
    async create(req, res) {
        const {name, description} = req.body
        const service = await CarService.create({name, description})
        return res.json(service)
    }
    async getAll(req, res) {
        const services = await CarService.findAll()
        return res.json(services)
    }
    async delete(req, res) {
        const {id} = req.params
        const service = await CarService.destroy({where: {id}})
        return res.json(service)
    }

}

module.exports = new ServiceController()