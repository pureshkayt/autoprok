const Router = require('express')
const router = new Router()
const truckbrandController = require('../controllers/truckbrandController')

router.post('/', truckbrandController.create)
router.get('/', truckbrandController.getAll)
router.delete('/:id', truckbrandController.delete)

module.exports = router