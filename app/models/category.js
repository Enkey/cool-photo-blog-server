const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Category Schema
 */

const CategorySchema = new Schema({
    title: {type: String, default: ''}
});

CategorySchema.path('title').validate(function (title, fn) {
    const Category = mongoose.model('Category');

    if (this.isNew) {
        Category.find({title: title}).exec(function (err, category) {
            fn(!err && category.length === 0);
        });
    } else fn(true);
}, 'Category already exists');

CategorySchema.methods = {
    getPublic: function () {
        return {
            id: this._id,
            title: this.title
        }
    }
};
CategorySchema.statics = {
    getPublic: function (category) {
        return {
            id: category._id,
            title: category.title
        }
    }
};


module.exports = mongoose.model('Category', CategorySchema);