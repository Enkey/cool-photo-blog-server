var Post = require('../../models/post');

module.exports = function (req, res, next) {
    var categoryID = req.params.category_id;
    console.log(categoryID);
    if(!categoryID) {
        return next();
    }
    Post.find({category: categoryID}).populate(Post.getPopulateQuery()).sort([['updatedAt', 'descending']]).exec(function (err, data) {
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