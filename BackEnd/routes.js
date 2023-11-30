const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getMembers);
router.post("/", controller.addMember);
router.get('/:id', controller.getMemberById);
router.put('/:id', controller.updateMember);
router.delete('/:id', controller.removeMember);

module.exports = router;
