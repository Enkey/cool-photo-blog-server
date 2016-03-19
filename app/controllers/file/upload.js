var multer  = require('multer');
var upload = multer({ dest: 'files/' }).single('image');
var File = require('../../models/file');

module.exports = function (req, res, next) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            // An error occurred when uploading
            console.log(err);
            next();
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