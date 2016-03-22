const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var Category = require('./category');
var File = require('./file');
var User = require('./user');

/**
 * Post Schema
 */

const PostSchema = new Schema({
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    image: {
        type: ObjectId,
        ref: 'File'
    },
    author: {
        type: ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

PostSchema.methods = {
    getPublic: function (cb) {
        const Post = mongoose.model('Post');
        Post.findById(this._id).populate(Post.getPopulateQuery()).exec(function (err, post) {
            if (err) throw err;
            cb(Post.public(post));
        });
    }
};

PostSchema.statics = {
    public: function (post) {
        return {
            id: post._id,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt,
            category: Category.getPublic(post.category),
            image: File.getPublic(post.image),
            author: User.public(post.author)
        }
    },
    getPopulateQuery: function () {
        return [
            {
                path: 'author',
                populate: {
                    path: 'avatar',
                    model: 'File'
                }
            },
            {
                path: 'image'
            },
            {
                path: 'category'
            }
        ]
    }
};

module.exports = mongoose.model('Post', PostSchema);