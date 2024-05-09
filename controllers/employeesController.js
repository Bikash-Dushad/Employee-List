const User = require('../models/user')
const Employees = require('../models/employee_list')

module.exports.employeePage = async function(req, res){
try {
        if(req.cookies.user_id){
            var user = await User.findById(req.cookies.user_id);
            var employees = await Employees.find({})
            if(user){
                return res.render("employeepage",{
                user: user,
                employees: employees
            })
            }
        }
} catch (error) {
    res.status(500).json({ message: error.message });
}
}


module.exports.delete = async function(req, res){
   try {
     var individualEmployee = await Employees.findById(req.params.id);

     if(individualEmployee){
        await Employees.deleteOne({ _id: individualEmployee._id });
        req.flash('success', " deleted successfully")
         return res.redirect('back')
     }else{
        req.flash('error', "You are not authorized to deletee others Text")
         console.log("not authorized")
         return res.redirect('back')
     }
   } catch (error) {
    console.log(error)
   }
}

module.exports.update = async function(req, res){
    try {
        var employee = req.params.id;
        var name = req.body.name;
        var email = req.body.email;
        var mobile = req.body.mobile;
        var designation = req.body.designation;
        var gender = req.body.gender;
        var courses = req.body.courses;
        var profile = req.files.profile;
        var profilename = profile.name;
        var profileLocation = __dirname+"/../assets/uploads/"+ profilename;

        var updateddetails = await Employees.findByIdAndUpdate(employee, {
            name: name, 
            email:email, 
            mobile:mobile, 
            designation: designation,
            gender:gender, 
            courses: courses, 
            profile: profileLocation
        });
        req.flash('success', "Details updated successfully")
        console.log(updateddetails);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

