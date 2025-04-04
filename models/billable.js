const mongoose = require('mongoose');
const Billable = mongoose.Schema({
    Department: { type: String, required: true },
    Condent: { type: String, required: true,unique: true },
    billingType:{ type: String, required: true },
});
Billable.index({ Condent: 1, billingType: 1 ,Department:1}, { unique: true });
module.exports = mongoose.model('Billable',Billable);