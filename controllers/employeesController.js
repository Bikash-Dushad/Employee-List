const User = require('../models/user')


module.exports.employeePage = async function(req, res){
    if(req.cookies.user_id){
        var user = await User.findById(req.cookies.user_id);
        if(user){
            return res.render("employeepage",{
            user: user,
        })
        }
    }
}