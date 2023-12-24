const { Router } = require('express');
const controller = require('../controller');
const { sessionJwtAuth } = require('../middleware/sessionJwtAuth');

const router = Router();

router.get('/', controller.getFavoriteProperties);
router.post("/", sessionJwtAuth, controller.addFavoriteProperty);
router.get('/:id', sessionJwtAuth, controller.getFavoritePropertyByPropertyIdAndMemberId);
router.get('/member/properties', sessionJwtAuth, controller.getFavoritePropertiesByMemberId);
router.delete('/', sessionJwtAuth, controller.removeFavoriteProperty);
router.delete('/delete/:id', sessionJwtAuth, controller.removeAllFavoritePropertiesByPropertyId);

module.exports = router;
