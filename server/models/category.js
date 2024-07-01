const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
  name:{ type: String, required: true },
  desc:String,
  type:String,
  images:[{ type: mongoose.Schema.Types.ObjectId , ref: 'File' }],
  // status : { 
  //   type: String,
  //   enum: ['active', 'inactive', 'deleted'],
  //   default: 'active',
  // }, // active,deleted
  active:{type:Boolean, required: true, default:true},
  _default:{type:Boolean, required: true, default:false},
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

const Category = mongoose.model('Category', categorySchema);

module.exports = {
  Category,
};