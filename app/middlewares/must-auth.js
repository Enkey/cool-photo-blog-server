module.exports = function (req, res, next){
    req.isAuthenticated()
        ? next()
        : res.json({error: true, message: "Access denied!"})
};