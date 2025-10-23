require('dotenv').config();
const connectDB = require('../utils/db');
const MenuItem = require('../models/MenuItem');

const sample = [
  { name:'Chicken Burger', description:'Juicy grilled burger', price:450, category:'Main' },
  { name:'Veg Pizza', description:'Cheesy pizza with vegetables', price:650, category:'Main' },
  { name:'Coke', description:'Chilled drink', price:150, category:'Drinks' },
];

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(sample);
    console.log('Seed complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
