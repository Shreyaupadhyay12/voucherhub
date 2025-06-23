const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const couponController = require('../controllers/couponController');

router.post('/add', upload.single('image'), couponController.addCoupon);
router.get('/all', couponController.getCoupons);

module.exports = router;
