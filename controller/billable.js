
const BillableModel = require('../models/billable');
module.exports = {
  BillableDetailspost: async (req, res) => {
    try {

      const {Department, Condent,billingType} = req.body;
      const result = new BillableModel({
        Department:Department,
        Condent:Condent,
        billingType: billingType,
      });
      await result.save();
        return res.status(201).json({ message: 'ok its saved', result });
    } catch (err) {
      res.status(400).json({
        err: err.message,
      });
    }
  },
  BillableDetailsget: async (req, res) => {
    try{
      const result = await BillableModel.find();
     res.status(200).json(result);
     return res
     }catch(err){
     res.status(400).json({
         err:err
      })
    }
  },
  BillableDetailsupdate: async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
     const updatedWorkOrder = await BillableModel.findByIdAndUpdate(id, updates, { new: true });
    if (updatedWorkOrder) {
      return res.status(200).json({ message: 'updated successfully' });
    }
    return res.status(200).json(updatedWorkOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
 },
 BillableDetailsdelete: async (req, res) => {
    try{
        await BillableModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
 }
};