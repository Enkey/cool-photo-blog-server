var Post = require('../../models/post');

module.exports = function (req, res, next) {
    var q = req.query.q;
    if(!q) {
        return next();
    }
    console.log(q);
    var rg = '/^'+q+'$/i';
    console.log(rg);
    Post.find({title: new RegExp('^'+q+'$', "i")}).exec(function (err, data) {
        console.log(data);
    });
    Post
        .find({title: new RegExp('^'+q+'$', "i")})
        //.find({
        //    $and: [
        //        { $or: [{title: new RegExp('^'+q+'$', "i")}] },
        //        { $or: [{description: new RegExp('^'+q+'$', "i")}] }
        //    ]
        //})
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