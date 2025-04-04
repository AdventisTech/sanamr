
const assetModel = require('../models/userprojects');
module.exports = {
  // assetDetails: async (req, res) => {
  //   try{
  //     const { Name, userid, TodayDate, billingType,projectid,
  //       projectfromtime,projecttotime,taskid,description,totaytotaltime,Department,status,statusdescription
  //       } = req.body;

  //     const result = new assetModel({
  //       Name:Name, userid:userid, TodayDate:TodayDate, billingType:billingType,projectid:projectid,
  //       projectfromtime:projectfromtime,projecttotime:projecttotime,taskid:taskid,description:description,
  //       totaytotaltime:totaytotaltime,Department:Department,status:status,statusdescription:statusdescription
   
  //     });
  //     await result.save();
  //     return res.status(201).json({ message: 'Successfully submitted', result });
  //   } catch (err) {
  //     res.status(400).json({
  //       err: err.message, 
  //     });
  //   }
  // },
  assetDetails: async (req, res) => {
    try {
      const { Name, userid, TodayDate, billingType, projectid,
        projectfromtime, projecttotime, taskid, description,
        totaytotaltime, Department, status, statusdescription } = req.body;
  
      // Check for duplicate entry
      const existingEntry = await assetModel.findOne({
        Name, TodayDate, projectid, projectfromtime, projecttotime
      });
  
      if (existingEntry) {
        return res.status(400).json({ message: 'Duplicate entry! This record already exists.' });
      }
  
      // If no duplicate, save the new entry
      const result = new assetModel({
        Name, userid, TodayDate, billingType, projectid,
        projectfromtime, projecttotime, taskid, description,
        totaytotaltime, Department, status, statusdescription
      });
  
      await result.save();
      return res.status(201).json({ message: 'Successfully submitted', result });
  
    } catch (err) {
      res.status(400).json({ err: err.message });
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
 userprojectupdate: async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedWorkOrder = await assetModel.findByIdAndUpdate(id, updates, { new: true });
    if (updatedWorkOrder) {
      await updatedWorkOrder.save();
      return res.status(200).json({ message: ' updated successfully' });
    }
    return res.status(200).json(updatedWorkOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
},
userprojectdelete: async (req, res) => {
  try{
    await assetModel.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"deleted successfully"});
  }catch(err){
    res.status(400).json({
        err:err
    })
  }
}
};


