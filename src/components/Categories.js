import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Categories.css';

import foodImg from '../assets/food.jpeg';
import footwearImg from '../assets/footwear.jpeg';
import clothingImg from '../assets/clothing.jpeg';
import dailyImg from '../assets/daily.jpeg';

const staticVouchers = [
  {
    id: 'static1',
    title: 'Food Vouchers',
    price: 200,
    discount: 20,
    expiry: '2025-08-01',
    image: foodImg,
  },
  {
    id: 'static2',
    title: 'Footwear Vouchers',
    price: 100,
    discount: 10,
    expiry: '2025-08-06',
    image: footwearImg,
  },
  {
    id: 'static3',
    title: 'Clothing Vouchers',
    price: 1000,
    discount: 40,
    expiry: '2025-10-01',
    image: clothingImg,
  },
  {
    id: 'static4',
    title: 'Daily Accessories Vouchers',
    price: 400,
    discount: 50,
    expiry: '2025-09-01',
    image: dailyImg,
  }
];

const Categories = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [backendVouchers, setBackendVouchers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/coupons/all')
      .then(res => setBackendVouchers(res.data))
      .catch(err => console.error('Error loading coupons from backend', err));
  }, []);

  const combinedVouchers = [
    ...backendVouchers.map(v => ({
      ...v,
      image: v.image.startsWith('/uploads')
        ? `http://localhost:5000${v.image}`
        : v.image,
      id: `db-${v.id}`
    })),
    ...staticVouchers
  ];

  const filtered = combinedVouchers
    .filter(v => v.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'discount') return b.discount - a.discount;
      if (sort === 'expiry') return new Date(a.expiry) - new Date(b.expiry);
      return 0;
    });

  return (
    <section id="categories" className="categories">
      <h3>Voucher Categories</h3>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search vouchers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="price">Price (Low to High)</option>
          <option value="discount">Discount (High to Low)</option>
          <option value="expiry">Expiry Date (Soonest First)</option>
        </select>
      </div>

      <div className="voucher-grid">
        {filtered.map(v => (
          <div key={v.id} className="voucher-card">
            <img src={v.image} alt={v.title} />
            <h4>{v.title}</h4>
            <p>
              Price: ₹{v.price}<br />
              Discount: {v.discount}%<br />
              Expires: {v.expiry}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
