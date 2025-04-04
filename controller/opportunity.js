
const opportunityModel = require('../models/opportunity');
module.exports = {
    opportunityDetailspost: async (req, res) => {
    try {

      const { opportunityName,AccountName, CloseDate,Amount,Status,Description} = req.body;
      const result = new opportunityModel({
        opportunityName:opportunityName,
        AccountName: AccountName,
        CloseDate: CloseDate,
        Amount:Amount,
        Status:Status,
        Description:Description,
      });
      await result.save();
        return res.status(201).json({ message: 'Success', result });
    } catch (err) {
      res.status(400).json({
        err: err.message,
      });
    }
  },
  opportunityDetailsget: async (req, res) => {
    try{
      const result = await opportunityModel.find();
     res.status(200).json(result);
     return res
     }catch(err){
     res.status(400).json({
         err:err
      })
    }
  },
  opportunityDetailsupdate: async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
     const updatedWorkOrder = await opportunityModel.findByIdAndUpdate(id, updates, { new: true });
    if (updatedWorkOrder) {
      return res.status(200).json({ message: 'Workorder details updated successfully' });
    }
    return res.status(200).json(updatedWorkOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
 },
 opportunityDetailsdelete: async (req, res) => {
    try{
        await opportunityModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Workorder details deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
 }
};