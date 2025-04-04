const mongoose = require('mongoose');
const Project = mongoose.Schema({
    ProjectId:{ type: String, required: true, unique: true},
    Title: { type: String, required: true },
    Client: { type: String,  required: true  },
    BillingType: { type: String, required: true },
    ProjectValue:{ type: String,  required: false  },
    ResourceBudget:{ type: String,  required: false  },
    ProjectDurationFrom:{ type: String,  required: false  },
    ProjectDurationTo:{ type: String,  required: false  },
    Description:{ type: String,  required: false },
    PONumber:{ type: String, required: false},
    PODate:{ type: String,  required: false  },
    Status:{type: String,  required: true},
    ProjectDuration:{ type: String,  required: false  },

});
Project.index({ ProjectId: 1 }, { unique: true });
const Project1 = mongoose.model('Project',Project );
module.exports = Project1;