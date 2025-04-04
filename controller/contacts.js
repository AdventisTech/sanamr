
const ContactModel = require('../models/contacts');
module.exports = {
  CondactDetailspost: async (req, res) => {
    try {
      const { Name,CompanyName, ContactNumber,MailId,Reference,Requirement} = req.body;
      const result = new ContactModel({
        Name:Name,
        CompanyName: CompanyName,
        ContactNumber: ContactNumber,
        MailId:MailId,
        Reference:Reference,
        Requirement:Requirement,
      });
      await result.save();
        return res.status(201).json({ message: 'Success', result });
    } catch (err) {
      res.status(400).json({
        err: err.message,
      });
    }
  },
  CondactDetailsget: async (req, res) => {
    try{
      const result = await ContactModel.find();
     res.status(200).json(result);
     return res
     }catch(err){
     res.status(400).json({
         err:err
      })
    }
  },
 CondactDetailsupdate: async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
     const updatedWorkOrder = await ContactModel.findByIdAndUpdate(id, updates, { new: true });
    if (updatedWorkOrder) {
      return res.status(200).json({ message: 'Workorder details updated successfully' });
    }
    return res.status(200).json(updatedWorkOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
 },
CondactDetailsdelete: async (req, res) => {
    try{
        await ContactModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Workorder details deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
 }
};