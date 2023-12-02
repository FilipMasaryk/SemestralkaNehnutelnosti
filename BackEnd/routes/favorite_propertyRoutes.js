const { Router } = require('express');
const controller = require('../controller');

const router = Router();

router.get('/', controller.getFavoriteProperties);
router.post("/:id", controller.addFavoriteProperty);
router.get('/:id', controller.getFavoritePropertyByMemberId);
router.delete('/:id', controller.removeFavoriteProperty);

module.exports = router;
