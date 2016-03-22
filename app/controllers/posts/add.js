var Post = require('../../models/post');

module.exports = function (req, res) {
    if(!req.isAuthenticated()) {
        return res.json({error: true, message: "Access denied!"})
    }

    var title = req.body.title;
    var description = req.body.description;
    var category_id = req.body.category_id;
    var image_id = req.body.image_id;

    if(title && description && category_id) {
        var post = new Post({
            title: title,
            description: description,
            author: req.user._id,
            category: category_id,
            image: image_id
        });
        post.save(function (err, data) {
            if(err) {
                return res.json({error: true, message: 'validation error', data: err.errors})
            }
            data.getPublic(function (post) {
                return res.json({success: true, post: post})
            });

        });

    }

};