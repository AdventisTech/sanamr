
// const nodemailer = require('nodemailer');
// const Form = require('../models/projects1');

// exports.submitForm = async (req, res) => {
//   try {
//     const formData = req.body;

//     // Map properties from formData to match the Mongoose schema
//     const mappedData = {
//       EmployeeId: formData.EmployeeId,
//       Leave: formData.Leave,
//       Name: formData.Name,
//       enddate: formData.enddate,
//       startdate: formData.startdate,
//       reason: formData.reason,
//       to: formData.to || [],
//       cc: formData.cc || [],
//       bcc: formData.bcc || [],
//     };

//     const savedForm = await saveFormToDatabase(mappedData);

//     await sendEmail(mappedData);

//     res.status(201).json({ success: true, data: savedForm });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

// async function saveFormToDatabase(formData) {
//   const savedForm = await Form.create(formData);
//   return savedForm;
// }

// async function sendEmail(formData) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       // user: 'leojohn391996@gmail.com',
//       // pass: 'uyld vhav luzt qywz',
//       user: 'csoftleave@gmail.com',
//       pass: 'xwmy slhx tftk beyc',
//     },
//   });

//   const mailOptions = {
//     // from: 'leojohn391996@gmail.com', // Use a default 'from' address or customize based on your needs
//     from: 'csoftleave@gmail.com', // Use a default 'from' address or customize based on your needs
//     to: formData.to.join(','), // Join multiple 'to' addresses if present
//     cc: formData.cc.join(','), // Join multiple 'cc' addresses if present
//     bcc: formData.bcc.join(','), // Join multiple 'bcc' addresses if present
//     subject: `Leave Request from ${formData.Name}`, // Customize subject based on your needs
//     text: `Name: ${formData.Name}\nEmployeeId: ${formData.EmployeeId}\nLeave: ${formData.Leave}\nStart Date: ${formData.startdate}\nEnd Date: ${formData.enddate}\nReason: ${formData.reason}`,
//   };

//   await transporter.sendMail(mailOptions);
// }



const nodemailer = require('nodemailer');
const Form = require('../models/projects1');

exports.submitForm = async (req, res) => {
  try {
    const formData = req.body;

    // Map properties from formData to match the Mongoose schema
    const mappedData = {
      EmployeeId: formData.EmployeeId,
      Leave: formData.Leave,
      Name: formData.Name,
      Financialyear:formData.Financialyear,
      Department:formData.Department,
      enddate: formData.enddate,
      startdate: formData.startdate,
      reason: formData.reason,
      to: formData.to || [],
      cc: Array.isArray(formData.cc) ? formData.cc.flat().filter(Boolean) : [],
      bcc: Array.isArray(formData.bcc) ? formData.bcc.flat().filter(Boolean) : [],
    };

    const savedForm = await saveFormToDatabase(mappedData);

    await sendEmail(mappedData, savedForm); // Pass savedForm as an argument

    res.status(201).json({ success: true, data: savedForm });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

async function saveFormToDatabase(formData) {
  // console.log('Attempting to save form data:', formData); // Add this line for debugging
  try {
    const savedForm = await Form.create(formData);
    // console.log('Form data saved successfully:', savedForm);
    return savedForm;
  } catch (error) {
    // console.error('Error saving form data to database:', error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

async function sendEmail(formData, savedForm) {
  const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'csoftleave@gmail.com',
  //     pass: 'xwmy slhx tftk beyc',
  //   },
  // });
  service: 'gmail',
  auth: {
    user: 'prouleave@gmail.com',
    pass: 'edug atcu wnhk mgho',
  },
});


  const cc = formData.cc ? formData.cc.flat().filter(Boolean) : [];
  const bcc = formData.bcc ? formData.bcc.flat().filter(Boolean) : [];


  const approveButton = `<a href="${getApprovalLink(formData, 'Approved', savedForm._id)}" style="text-decoration: none;"><button style="background-color: green; color: white; padding: 10px; margin: 5px; cursor: pointer; border: none;">Approve</button></a>`;
  const declineButton = `<a href="${getApprovalLink1(formData, 'Declined', savedForm._id)}" style="text-decoration: none;"><button style="background-color: red; color: white; padding: 10px; margin: 5px; cursor: pointer; border: none;">Decline</button></a>`;
 
  
  // <p>${approveButton} ${declineButton}</p>

  const mailOptions = {
    // from: 'csoftleave@gmail.com',
    from: 'prouleave@gmail.com',
    to: formData.to.join(','),
    cc: cc.join(','),
    bcc: bcc.join(','),
    subject: `Leave Request from ${formData.Name}`,
    text: `Name: ${formData.Name}\nEmployeeId: ${formData.EmployeeId}\nLeave: ${formData.Leave}\nStart Date: ${formData.startdate}\nEnd Date: ${formData.enddate}\nReason: ${formData.reason}`,
    html: `
    <p>Name: ${formData.Name}</p>
    <p>EmployeeId: ${formData.EmployeeId}</p>
    <p>Leave: ${formData.Leave}</p>
    <p>Start Date: ${formData.startdate}</p>
    <p>End Date: ${formData.enddate}</p>
    <p>Reason: ${formData.reason}</p>

    <p><a href="https://proutimesheet.onrender.com">Respond Now</a></p>
   
  
  `,
  };

  await transporter.sendMail(mailOptions);
}

function getApprovalLink(formData, status, formId) {

//  const baseUrl = `http://localhost:10000/api/user/approve/${formId}`;
  const baseUrl = `https://proutimesheet.onrender.com/api/user/approve/${formId}`;




  return baseUrl;
}




function getApprovalLink1(formData, status, formId) {

  const baseUrl = `https://proutimesheet.onrender.com/api/user/decline/${formId}`;

  return baseUrl;
}




// New route handler to get asset details
exports.Detailsget = async (req, res) => {
  try {
    const result = await Form.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};


exports. mailDetailsupdate = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
     const updatedWorkOrder = await Form.findByIdAndUpdate(id, updates, { new: true });
    if (updatedWorkOrder) {
      return res.status(200).json({ message: 'Approved' });
    }
    // return res.status(200).json(updatedWorkOrder);
    return res.status(200).json({ message: 'Declined' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
 },

 exports.mailDetailsdelete = async (req, res) => {
  try{
    await Form.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Leave Details deleted successfully"});
  }catch(err){
    res.status(400).json({
        err:err
    })
  }
}