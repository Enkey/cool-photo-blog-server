module.exports = function (req, res) {
    if(!req.isAuthenticated()) {
        return res.json({error: true, message: "Access denied!"})
    }
    req.logout();
    res.json({success: true});
};
/*
 function (req, res, next) {
 req.logout();
 req.session.save(function (err) {
 if (err) {
 return next(err);
 }
 res.json({success: true});
 });
 }
 */