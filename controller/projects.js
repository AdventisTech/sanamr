
const assetModel = require('../models/projects');
module.exports = {
  assetDetails: async (req, res) => {
    try {
      const { ProjectId,Title, Client,Status,ProjectDuration,BillingType,ProjectValue,ResourceBudget,ProjectDurationFrom,ProjectDurationTo,Description,PONumber,PODate} = req.body;
      const result = new assetModel({
        ProjectId:ProjectId,
        Title: Title,
        Client: Client,
        BillingType :BillingType,
        ProjectValue:ProjectValue,
        ResourceBudget:ResourceBudget,
        ProjectDurationFrom:ProjectDurationFrom,
        ProjectDurationTo:ProjectDurationTo,
        Description: Description,
        PONumber:PONumber,
        PODate:PODate,
        Status:Status,
        ProjectDuration:ProjectDuration
 
      });

      await result.save();
      return res.status(201).json({ message: 'Successfully submitted', result });
    } catch (err) {
      res.status(400).json({
        err: err.message
      });
    }
  },
  assetDetailsget: async (req, res) => {
    try{
     const result = await assetModel.find();
     res.status(200).json(result);
     return res
     }catch(err){
     res.status(400).json({
         err:err
      })
    }
  },
 projectDetailsupdate: async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedWorkOrder = await assetModel.findByIdAndUpdate(id, updates, { new: true });
    if (updatedWorkOrder) {
      return res.status(200).json({ message: 'Workorder details updated successfully' });
    }
    return res.status(200).json(updatedWorkOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
},
projectDetailsdelete: async (req, res) => {
    try{
      await assetModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Workorder details deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
  }
};