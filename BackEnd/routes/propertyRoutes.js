const { Router } = require('express');
const controller = require('../controller');

const router = Router();

router.get('/', controller.getProperties);
router.get('/:id', controller.getPropertyById);
router.post("/", controller.addProperty);
router.delete('/:id', controller.removeProperty);
router.put('/:id', controller.updateProperty);

module.exports = router;
