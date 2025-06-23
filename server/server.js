const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Import route files
const couponRoutes = require('./routes/couponRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- Add this line

// ✅ Mount routes
app.use('/api/coupons', couponRoutes);
app.use('/api/auth', authRoutes); // <-- Add this line

// ✅ Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
