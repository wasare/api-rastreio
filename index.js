const express = require('express');
const app = express();
const deliveryRoutes = require('./routes/deliveryRoutes');

// Middlewares
app.use(express.json());

// Routes
app.use('/tenteacharamudanca', deliveryRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Aprova meu fork van der som ${PORT}`);
});