// const mongoose = require('mongoose');
// const employeeSchema = mongoose.Schema({
//     EmployeeId:{ type: String, unique: true, required: [true, 'EmployeeIdshould be mandatory'] },
//     Name: { type: String, unique: false, required: [true, 'Name should be mandatory'] },
//     Designation: { type: String, unique: false, required: [true, 'Designation should be mandatory'] },
//     Department: { type: String, unique: false, required: [true, 'Department should be mandatory'] },
//     DOJ:{ type: String, unique: false, required: [true, 'DOJ should be mandatory'] },
//     Salary: { type: Number, unique: false, required: [false, 'Salary should not be mandatory'] },
//     Emailaddress: { type: String, unique: true, required: [true, 'Email should be mandatory'] },
//     Password: {
//         type: String,
//         unique: false,
//         required: [true, 'Password should be mandatory'],
//       },
//     profilePicture: { type: String, required: [false, 'picture should not be mandatory'] },
// });
// module.exports = mongoose.model('Employe',employeeSchema);




const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    EmployeeId:{ type: String, unique: true, required: [true, 'EmployeeIdshould be mandatory'] },
    Name: { type: String, unique: false, required: [true, 'Name should be mandatory'] },
    Designation: { type: String, unique: false, required: [true, 'Designation should be mandatory'] },
    Department: { type: String, unique: false, required: [true, 'Department should be mandatory'] },
    DOJ:{ type: String, unique: false, required: [true, 'DOJ should be mandatory'] },
    EmployeeStatus: { type: String, unique: false, required: [true, 'EmployeeStatus should be mandatory'] },
    DOL:{ type: String, unique: false, required: [false, 'DOL should be mandatory'] },
    Salary: { type: Number, unique: false, required: [false, 'Salary should not be mandatory'] },
    Emailaddress: { type: String, unique: true, required: [true, 'Email should be mandatory'] },
    Password: {
        type: String,
        unique: false,
        required: [true, 'Password should be mandatory'],
      },
    profilePicture: { type: String, required: [false, 'picture should not be mandatory'] },
});
module.exports = mongoose.model('Employe',employeeSchema);