const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee_list_Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    designation: { type: String, required: true},
    gender: { type: String, required: true},
    courses: [{ type: String, required: true}],
    profile: { type: String}

},
{
    timestamps: true
});

const Employees = mongoose.model('Employee_list', employee_list_Schema);

module.exports = Employees;