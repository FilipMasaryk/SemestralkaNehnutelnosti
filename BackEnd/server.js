const express = require("express");
const cookieParser = require("cookie-parser")
const memberRoutes = require('./routes/memberRoutes')
const propertyRoutes = require('./routes/propertyRoutes')
const favorite_propertyRoutes = require('./routes/favorite_propertyRoutes')
const photoRoutes = require('./routes/photoRoutes')
//const uploadPhotoRoutes = require('./routes/uploadPhotoRoutes')
const path = require('path')
const multer = require('multer')
const cors = require('cors');


//nastavenie options aby islo setnut cookies 
const corsOptions = {
    origin: true,
    credentials: true,
};

const app = express();
const port = 5174;
process.env.MY_SECRET = '123';

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/members', memberRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favorite_propertyRoutes);
app.use('/api/photos', photoRoutes);
//app.use('/api/upload',uploadPhotoRoutes);
app.use('/images', express.static('upload/images'));

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