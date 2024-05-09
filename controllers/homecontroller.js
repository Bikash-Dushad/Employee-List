const User = require('../models/user')
const Employees = require('../models/employee_list')
const fs = require('fs')

module.exports.homepage =async (req, res)=>{
    if(req.cookies.user_id){
        var user = await User.findById(req.cookies.user_id);
        // var text = await Text.find({}).populate('user')
        if(user){
                return res.render('homepage',{
                    user: user,
                    // text: text,
                })
        }else{
            console.log("user not found or not authorized");
            req.flash('error', "signin first")
            return res.redirect("/auth/signinpage")
        }
    }else{
        req.flash('error', "signin first")
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
        return res.redirect('back')
    }else{
    
    if(req.files){
        var profile = req.files.profile;
        var profilename = profile.name;
        var profileLocation = __dirname+"/../assets/uploads/"+ profilename;
        var newEmployee = await Employees.create({name: name, email:email, mobile:mobile, designation: designation, gender:gender, courses: courses, profile: profileLocation})
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
    // Check if file was uploaded
    // if (req.file) {
    //     var profile = req.file;
    //     var profilename = profile.name
    //     console.log(profile, profilename)
    // } else {
    //     // Handle case where file was not uploaded
    //     console.log("No file uploaded");
    //     return res.redirect('back');
    // }

    // try {
    //     // Create new employee with uploaded profile
    //     var employeeList = await Employees.findOne({email: email, mobile: mobile});
    //     if (employeeList) {
    //         console.log("email/mobile already exists");
    //     } else {
    //         var newEmployee = await Employees.create({
    //             name: name,
    //             email: email,
    //             mobile: mobile,
    //             designation: designation,
    //             gender: gender,
    //             course: courses,
    //             profile: profile
    //         });
    //         console.log("New employee created:", newEmployee);
    //         // Move the uploaded file to the desired location
    //         await profile.mv(fileLocation);
    //     }
    //     return res.redirect('back');
    // } catch (err) {
    //     console.error("Error creating employee:", err);
    //     return res.status(500).send("Internal Server Error");
    // }





// module.exports.addtext = async function(req, res){
//     try {
//         var content = req.body.content;
//         console.log(content)
//         var user = req.cookies.user_id
//         var text = await Text.findOne({
//             content: content,
//             user: user
//         }).populate()
//         if(text){
//             req.flash('error', "text already exist")
//             console.log("text already exist")
//             return res.redirect('back')
//         }else{
//         var newText = await Text.create({content: content, user: user}) 
//         req.flash('success', "New Text added")
//         console.log(newText)
        
//         return res.redirect('back')
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

