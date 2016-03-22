module.exports = function (req, res) {
    if(!req.isAuthenticated()) {
        return res.json({error: true, message: "Access denied!"})
    }
    req.logout();
    res.json({success: true});
};