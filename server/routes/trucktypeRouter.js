const Router = require('express')
const router = new Router()
const trucktypeController = require('../controllers/trucktypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',trucktypeController.create)
router.get('/', trucktypeController.getAll)
router.delete('/:id', trucktypeController.delete)

module.exports = router