const User = require('../models/user')
const Employees = require('../models/employee_list')
const fs = require('fs')

module.exports.homepage =async (req, res)=>{
    if(req.cookies.user_id){
        var user = await User.findById(req.cookies.user_id);
        if(user){
                return res.render('homepage',{
                    user: user,
                })
        }else{
            console.log("user not found or not authorized");
            return res.redirect("/auth/signinpage")
        }
    }else{
        
        return res.redirect("/auth/signinpage")
    }
}

module.exports.employeesform = async function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var designation = req.body.designation;
    var gender = req.body.gender;
    var courses = req.body.courses;
    var employee = await Employees.findOne({email: email});
    if(employee){
        console.log("Emp alreaddy exists")
        req.flash('error', "user already exists")
        return res.redirect('back')
    }else{
    
    if(req.files){
        var profile = req.files.profile;
        var profilename = profile.name;
        var profileLocation = __dirname+"/../assets/uploads/"+ profilename;
        var newEmployee = await Employees.create({
            name: name, 
            email:email, 
            mobile:mobile, 
            designation: designation, 
            gender:gender, 
            courses: courses, 
            profile: profileLocation
        })
        req.flash('success', "user added")
        console.log(newEmployee)

        console.log(profilename)
        profile.mv(profileLocation, function(err){
            if(err){
                console.log(err)
            }else{
                console.log("successfull")
            }
        })

    return res.redirect('back')
    }
}
};

