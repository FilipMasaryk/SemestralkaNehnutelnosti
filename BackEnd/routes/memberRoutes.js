const { Router } = require('express');
const controller = require('../controller');
const { sessionJwtAuth } = require('../middleware/sessionJwtAuth');

const router = Router();

router.get('/', controller.getMembers);
router.post("/", controller.addMember);
router.get('/:id', controller.getMemberById);
router.post('/login', controller.getMemberLogin);
router.put('/:id', sessionJwtAuth, controller.changeMemberPassword);
router.delete('/:id', controller.removeMember);
router.get('/getId/:name', controller.getMemberIdByName)

module.exports = router;
