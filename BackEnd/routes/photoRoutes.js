const { Router } = require('express');
const controller = require('../controller');
const path = require('path')
const multer = require('multer')
const { sessionJwtAuth } = require('../middleware/sessionJwtAuth');

const router = Router();

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    storage: storage,
    limits: {
        fileSize: 10000000
    }
})

router.get('/', controller.getPhotos);
router.get('/properties/:id', controller.getPhotosByPropertyId);
router.get('/:id', controller.getPhotoById);
router.post("/:id", upload.array('images', 5), controller.addPhoto);
router.delete('/:id', controller.removePhoto);
router.delete('/all/:id', controller.removePropertyPhotos);

module.exports = router;
