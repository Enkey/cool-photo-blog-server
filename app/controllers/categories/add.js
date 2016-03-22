var Category = require('../../models/category');

module.exports = function (req, res) {
    if(!req.isAuthenticated()) {
        return res.json({error: true, message: "Access denied!"})
    }
    var title = req.body.title;

    if(title) {
        var category = new Category({title: title});
        category.save(function (err, data) {
            if(err) {
                return res.json({error: true, message: err.errors.title.message})
            }
            return res.json({success: true, category: data.getPublic()})
        });

    }

};