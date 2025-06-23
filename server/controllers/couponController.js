const db = require('../config/db');

exports.addCoupon = (req, res) => {
  const { title, price, discount, expiry, added_by } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const imagePath = `/uploads/${imageFile.filename}`;

  const query = `
    INSERT INTO coupons (title, price, discount, expiry, image, added_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [title, price, discount, expiry, imagePath, added_by], (err, result) => {
    if (err) {
      console.error('DB Insert Error:', err);
      return res.status(500).json({ message: 'Failed to add coupon' });
    }

    return res.status(200).json({ message: 'Coupon added successfully' });
  });
};

exports.getCoupons = (req, res) => {
  db.query('SELECT * FROM coupons', (err, results) => {
    if (err) {
      console.error('Error fetching coupons:', err);
      return res.status(500).json({ message: 'Failed to fetch coupons' });
    }
    res.status(200).json(results);
  });
};
