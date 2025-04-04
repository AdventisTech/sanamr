const UserModel = require('../models/Registration');
const bcrypt = require('bcryptjs');

const userprojectsModel = require('../models/userprojects');

const debug = require('debug')('app:controller:userDetailsupdate');

module.exports = {
  RegisterDetails: async (req, res) => {

    try {
      const { EmployeeId, Name, Designation,Department,DOJ, Salary, Emailaddress, Password,EmployeeStatus,DOL } = req.body;

      const existingUser = await UserModel.findOne({ EmployeeId });

      if (existingUser) {
        // Handle duplicate EmployeeId
        return res.status(400).json({ error: 'EmployeeId is already in use' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);

      const result = new UserModel({
        EmployeeId: EmployeeId,
        Name: Name,
        Designation: Designation,
        Department: Department,
        DOJ:DOJ,
        EmployeeStatus:EmployeeStatus,
        DOL:DOL,
        Salary: Salary,
        Emailaddress: Emailaddress,
        Password: hashedPassword,
      });

      await result.save();

      res.status(201).json({ result, message: 'Successfully Registered' });
    } catch (error) {

      res.status(500).json({ error: 'Internal server error' });
    }
  },


LoginDetails: async (req, res) => {

  try {
      const { Emailaddress, Password } = req.body;
      const user = await UserModel.findOne({ Emailaddress });
      if (!user) {
          return res.json({ message: 'Invalid credentials' });
      }
      const comparePassword = await bcrypt.compare(Password, user.Password);
      if (comparePassword) {
          return res.status(200).json({ message: 'Successfully logged in', user: { ...user.toObject(), profilePicture: user.profilePicture } });
      } else {
          return res.json({ message: 'Invalid credentials' });
      }
  } catch (err) {
      res.status(400).json({
          err: err
      });
  }
},   
  LoginDetailsget: async (req, res) => {
            try{
             const result = await UserModel.find();
             res.status(200).json(result);
             return res
            }catch(err){
             res.status(400).json({
                 err:err
              })
            }
  },
forgotPassword : async (req, res) => {
  try {
    const { Emailaddress } = req.body;
    const user = await UserModel.findOne({ Emailaddress });
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    user.resetToken = otp;
    user.resetTokenExpiration = Date.now() + 600000; 
    await user.save();
    return res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
},
resetPassword : async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await UserModel.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.json({ message: 'Invalid or expired reset token' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.Password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    return res.json({ message: 'Password successfully reset' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
},
userDetailsdelete: async (req, res) => {
    try{
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Workorder details deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
  },


userDetailsupdate: async (req, res) => {
  try {
    const { EmployeeId, Name, Designation,Department,DOJ, Salary, Emailaddress, Password,EmployeeStatus,DOL  } = req.body;

    // Check if a user with the specified EmployeeId exists
    const existingUser = await UserModel.findOne({ EmployeeId });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If a new password is provided, hash it before updating
    if (Password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);
      existingUser.Password = hashedPassword;
    }

    // Update other fields
    existingUser.Name = Name;
    existingUser.Designation = Designation;
    existingUser.Department = Department;
    existingUser.DOJ = DOJ;
    existingUser.EmployeeStatus = EmployeeStatus
    existingUser.DOL = DOL
    existingUser.Salary = Salary;
    existingUser.Emailaddress = Emailaddress;


    // Save the updated user
    await existingUser.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {

    res.status(500).json({ error: 'Internal server error' });
  }
}

}