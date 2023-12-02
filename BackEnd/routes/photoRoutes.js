const { Router } = require('express');
const controller = require('../controller');

const router = Router();

router.get('/', controller.getPhotos);
router.get('/:id', controller.getPhotosByPropertyId);
router.post("/", controller.addPhoto);
router.delete('/:id', controller.removePhoto);

module.exports = router;
