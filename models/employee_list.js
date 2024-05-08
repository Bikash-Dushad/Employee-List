const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employee_list_Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    designation: { type: String, required: true},
    gender: { type: String, required: true},
    course: [{ type: String, required: true}],
    image: { type: String}

},
{
    timestamps: true
});
const Text = mongoose.model('Employee_list', employee_list_Schema);

module.exports = Text;