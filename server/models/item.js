const mongoose = require('mongoose');
const Joi = require('joi');

const itemSchema = new mongoose.Schema({
  name:{ type: String, required: true },
  desc:String,
  category:{ type: mongoose.Schema.Types.ObjectId , ref: 'Category' },
  type:String,
  price:Number,
  stockQuantity:Number,
  images:[{ type: mongoose.Schema.Types.ObjectId , ref: 'File' }],
  status : { 
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active',
  }, // active,deleted
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

const Item = mongoose.model('Item', itemSchema);

module.exports = {
  Item,
};