const mongoose = require('mongoose');
const Project = mongoose.Schema({
    Name: { type: String, required: true },
    userid:{ type: String, required: true },
    TodayDate: { type: String, required: true },
    billingType: { type: String, required: true },
    projectid:{ type: String, required: true },
    projectfromtime: { type: String, required: true   },
    projecttotime: { type: String, required: true  },
    taskid: { type: String, required: false },
    description: { type: String, required: false },
    totaytotaltime:{ type: String, required: false},
    Department: { type: String, required: false },
    status: { type: String, required: false },
    // statusdescription: { type: String, required: false },
    statusDescription: { type: String, required: false },
});
module.exports = mongoose.model('UserProject',Project);