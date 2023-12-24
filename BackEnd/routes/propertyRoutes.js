const { Router } = require('express');
const controller = require('../controller');
const { sessionJwtAuth } = require('../middleware/sessionJwtAuth');

const router = Router();

router.get('/', controller.getProperties);
router.get('/:id', controller.getPropertyById);
router.get('/member/getMemberProperties', sessionJwtAuth, controller.getProperteisByMemberId);
router.post("/", sessionJwtAuth, controller.addProperty);
router.delete('/:id', sessionJwtAuth, controller.removeProperty);
router.put('/:id', controller.updateProperty);

module.exports = router;
