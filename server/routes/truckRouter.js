const Router = require('express')
const router = new Router()
const truckController = require('../controllers/truckController')

router.post('/',  truckController.create)
router.get('/', truckController.getAll)
router.get('/search', truckController.search)
router.get('/:id', truckController.getOne)
router.delete('/:id', truckController.delete)
router.put('/:id', truckController.update)

module.exports = router