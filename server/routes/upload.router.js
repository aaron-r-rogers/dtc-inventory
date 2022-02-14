const express = require('express');
const router = express.Router();
const multer  = require('multer');
const pool = require('../modules/pool');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine });


const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.post('/', upload.single('image'),rejectUnauthenticated, (req, res, next) => {
    console.log('send req.file.filename to database as path:', req.file.filename);
    
    res.send(req.file.filename)
});

module.exports = router;