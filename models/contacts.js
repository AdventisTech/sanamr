const mongoose = require('mongoose');
const Contacts = mongoose.Schema({
    Name:{ type: String, required: true},
    CompanyName: { type: String, required: true },
    ContactNumber: { type: Number,  required: true,unique: true   },
    MailId:{ type: String,  required: true , unique: true },
    Reference:{ type: String,  required: false  },
    Requirement:{ type: String,  required: false  },
});
module.exports = mongoose.model('Contacts',Contacts );