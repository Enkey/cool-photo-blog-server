var Post = require('../../models/post');

module.exports = function (req, res) {
    Post.find({}).populate(Post.getPopulateQuery()).sort([['updatedAt', 'descending']]).exec(function (err, data) {
        if (err) throw err;
        if (!data) {
            return res.json({error: true, message: 'Categories list is empty!'})
        }
        var parsedData = [];

        data.forEach(function (item) {
            parsedData.push(Post.public(item));
        });

        res.json({success: true, data: parsedData});

    });

};