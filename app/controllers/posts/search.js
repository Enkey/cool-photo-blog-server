var Post = require('../../models/post');

module.exports = function (req, res, next) {
    var q = req.query.q;
    if(!q) {
        return next();
    }

    Post
        .find({})
        .or({title:  {$regex: q}})
        .or({description:  {$regex: q}})
        .populate(Post.getPopulateQuery())
        .sort([['updatedAt', 'descending']])
        .exec(function (err, data) {
        if (err) throw err;
        if (!data) {
            return res.json({error: true, message: 'Nothing was found!'})
        }
        var parsedData = [];

        data.forEach(function (item) {
            parsedData.push(Post.public(item));
        });

        res.json({success: true, data: parsedData});

    });

};