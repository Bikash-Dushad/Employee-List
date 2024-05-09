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

// module.exports.updatetext = async function(req, res){
//     try {
//         var user = req.cookies.user_id;
//         var textId = req.params.id;
//         var texttoupdate = req.body.texttoupdate;

//         var updatedText = await Text.findByIdAndUpdate(textId, { content: texttoupdate });
//         req.flash('success', "Text updated successfully")
//         console.log(updatedText);
//         return res.redirect('back');
//     } catch (error) {
//         console.log(error);
//     }
// }

