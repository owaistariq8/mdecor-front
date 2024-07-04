const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
  customer :{ type: mongoose.Schema.Types.ObjectId , ref: 'Customer' },
  user :{ type: mongoose.Schema.Types.ObjectId , ref: 'User' },
  items :{ type: mongoose.Schema.Types.ObjectId , ref: 'Item' },
  totalPrice :Number,
  billingSite :{ type: mongoose.Schema.Types.ObjectId , ref: 'Site' },
  shippingSite :{ type: mongoose.Schema.Types.ObjectId , ref: 'Site' },
  paymentMethod :{ 
    type: String,
    enum: ['Cash', 'CreditCard', 'Online', 'Other'],
    default: 'Cash',
  }, 
  status:{ 
    type: String,
    enum: ['paid', 'checkout', 'canceled', 'failed', 'expired', 'deleted'],
    default: 'Cash',
  }, 
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order,
};