const express = require("express");
const memberRoutes = require('./routes/memberRoutes')
const propertyRoutes = require('./routes/propertyRoutes')
const favorite_propertyRoutes = require('./routes/favorite_propertyRoutes')
const photoRoutes = require('./routes/photoRoutes')
const path = require('path')
const multer = require('multer')

const app = express();
const port = 3000;


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

app.use(express.json());

app.use('/api/members', memberRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favorite_propertyRoutes);
app.use('/api/photos', photoRoutes);

app.use('/images', express.static('upload/images'));
app.post('/api/upload', upload.array('images', 5), (req, res) => {
    const uploadedFiles = req.files.map(file => {
        return {
            filename: file.filename,
            image_url: `http://localhost:3000/images/${file.filename}`
        };
    });

    res.status(200).json({ uploadedFiles });
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    } else if (err) {
        res.status(400).send('Error: ' + err.message);
    } else {
        next();
    }
}

app.use(errHandler);
app.listen(port, () => console.log("app listening on port " + port))