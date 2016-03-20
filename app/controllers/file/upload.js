var multer  = require('multer');
var crypto = require('crypto');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname));
        });
    }
});

var upload = multer({ storage: storage }).single('image');
var File = require('../../models/file');

var validMIMETypes = ['image/gif', 'image/jpeg', 'image/png', 'image/pjpeg'];


module.exports = function (req, res, next) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            // An error occurred when uploading
            console.log(err);
            next();
        }

        if(validMIMETypes.indexOf(req.file.mimetype) == -1) {
            return res.json({error: true, message: 'Invalid file type!'})
        }

        var file = new File({
            originalName: req.file.originalname,
            filename: req.file.filename,
            size: req.file.size
        });

        file.save(function (err) {
            if(err) return next(err);
            res.json({success: true, image: file});
        });


    });
};