require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./utils/db');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send({ status: 'ok' }));
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error(err);
  }
})();
