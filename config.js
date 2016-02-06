var path = require('path');
module.exports = {
    'secret': 'atcourse-secret',
    'database': 'mongodb://127.0.0.1/cool-photo-blog',
    'publicPath': path.resolve(__dirname, 'public')
};