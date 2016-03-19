module.exports = function (req, res, next) {
    res.json({success: true, file: req.params.filename});
};