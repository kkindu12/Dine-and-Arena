const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// Place order
router.post('/', async (req, res) => {
  try {
    const { customerName, items } = req.body;
    if (!customerName || !items || items.length === 0)
      return res.status(400).json({ error: 'Invalid input' });

    let total = 0;
    for (const it of items) {
      const menuItem = await MenuItem.findById(it.item);
      if (!menuItem) return res.status(400).json({ error: 'Menu item not found' });
      total += menuItem.price * (it.quantity || 1);
    }

    const order = new Order({ customerName, items, total });
    const saved = await order.save();
    const populated = await Order.findById(saved._id).populate('items.item');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
