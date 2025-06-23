import React from 'react';
import '../styles/VoucherCard.css';

// Static imports for images
import foodImg from '../assets/food.jpeg';
import footwearImg from '../assets/footwear.jpeg';
import clothingImg from '../assets/clothing.jpeg';
import dailyImg from '../assets/daily.jpeg';

// Mapping image names to imports
const imageMap = {
  'food.jpeg': foodImg,
  'footwear.jpeg': footwearImg,
  'clothing.jpeg': clothingImg,
  'daily.jpeg': dailyImg,
};

const VoucherCard = ({ title, price, discount, expiry, image, link }) => {
  const imgSrc = imageMap[image];

  return (
    <div className="voucher-card">
      <a href={link}>
        <img
          src={imgSrc}
          alt={title}
          className="voucher-card-image"
        />
        <h4 className="voucher-card-title">{title}</h4>
        <p className="voucher-card-details">
          Price: ₹{price}<br />
          Discount: {discount}%<br />
          Expires: {expiry}
        </p>
      </a>
    </div>
  );
};

export default VoucherCard;
