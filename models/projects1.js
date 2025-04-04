// const mongoose = require('mongoose');
// const formSchema = new mongoose.Schema({
//     FirstName: { type: String, required: true },
//     LastName: { type: String, required: true },
//     Email: { type: String, required: true },
//     Subject: { type: String, required: true },
//     Message: { type: String, required: true },
//   });
  
//   const Form = mongoose.model('Form', formSchema);
  
//   module.exports = Form;
  


  const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    
EmployeeId: { type: String, required: true },   
Leave: { type: String, required: true },
Name: { type: String, required: true },
Financialyear:{ type: String, required: true },
enddate: { type: String, required: true },
startdate: { type: String, required: true },
reason: { type: String, required: false },
Department:{ type: String, required: false },
// status:{ type: String, required: false },
status: { type: String, default: 'Pending' },
statusDescription:{ type: String, required: false },
ApprovedBy:{ type: String, required: false },
to: { type: [String], default: [] }, // Array of 'to' addresses
cc: { type: [String], default: [] }, // Array of 'cc' addresses
bcc: { type: [String], default: [] }, // Array of 'bcc' addresses

});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
