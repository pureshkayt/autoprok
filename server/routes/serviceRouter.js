const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', serviceController.create)
router.get('/', serviceController.getAll)
router.delete('/:id', checkRole('ADMIN'), serviceController.delete)

module.exports = router