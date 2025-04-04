const mongoose = require('mongoose');
const opportunity = mongoose.Schema({
    opportunityName:{ type: String, required: true},
    AccountName: { type: String, required: true },
    CloseDate: { type: String,  required: false  },
    Amount :{ type: Number,  required: false ,},
    Status:{ type: String,  required: true  },
    Description:{ type: String,  required: false  },
});
module.exports = mongoose.model('opportunity',opportunity );