var Message = require('../../models/message');
module.exports = function (req, res) {
    //setTimeout(function () {
    //    console.log('get messages list');
    //    res.json({success: true, messages: []})
    //}, 5000);

    Message.find({}).populate(Message.getPopulateQuery()).sort([['createdAt', 'ascending']]).exec(function (err, data) {
        if (err) throw err;
        if (!data) {
            return res.json({error: true, message: 'Categories list is empty!'})
        }
        var parsedData = [];

        data.forEach(function (item) {
            parsedData.push(Message.public(item));
        });

        res.json({success: true, messages: parsedData});

    });

};