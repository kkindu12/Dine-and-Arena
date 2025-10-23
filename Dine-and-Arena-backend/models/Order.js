const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, default: 1 }
});

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['placed','preparing','served','cancelled'], default: 'placed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
