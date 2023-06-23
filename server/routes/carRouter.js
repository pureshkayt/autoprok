const Router = require('express')
const router = new Router()
const carController = require('../controllers/carController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', carController.create)
router.get('/', carController.getAll)
router.get('/search', carController.search)
router.get('/:id', carController.getOne)
router.delete('/:id', carController.delete)
router.put('/:id', carController.update)

module.exports = router