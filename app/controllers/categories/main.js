var Category = require('../../models/category');

module.exports = function (req, res) {
    Category.find({}, function (err, data) {
        if(err) throw err;
        if(!data) {
            return res.json({error: true, message: 'Categories list is empty!'})
        }
        var parsedData = [];

        data.forEach(function (item) {
            parsedData.push(item.getPublic());
        });

        res.json({success: true, data: parsedData});

    });

};