const mongoose = require('mongoose');
const Joi = require('joi');

const roleSchema = new mongoose.Schema({
  name:String,
  desc:String,
  roleType : { 
    type: String,
    enum: ['SuperAdmin', 'SalesManager', 'Operator', 'Customer'],
    default: 'Customer',
  }, 
  isActive:{ type: Boolean, required: true, default: true },
  disableDelete:{ type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

const Role = mongoose.model('Role', roleSchema);

module.exports = {
  Role,
};