import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    discount: '',
    expiry: '',
    image: null,
    added_by: user?.email || ''
  });

  const [myCoupons, setMyCoupons] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios.get('http://localhost:5000/api/coupons/all')
        .then(res => {
          const adminCoupons = res.data.filter(c => c.added_by === user.email);
          setMyCoupons(adminCoupons);
        })
        .catch(err => console.error('Error fetching coupons', err));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      await axios.post('http://localhost:5000/api/coupons/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Coupon added!');

      // Refresh coupons list instead of redirecting
      const res = await axios.get('http://localhost:5000/api/coupons/all');
      const updatedCoupons = res.data.filter(c => c.added_by === user?.email);
      setMyCoupons(updatedCoupons);

      // Reset form
      setForm({
        title: '',
        price: '',
        discount: '',
        expiry: '',
        image: null,
        added_by: user?.email || ''
      });

    } catch (err) {
      console.error('Error adding coupon', err);
      alert('Error adding coupon');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome, {user?.name || 'Admin'}</h2>

      <form className="coupon-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Coupon Title" onChange={handleChange} value={form.title} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} value={form.price} required />
        <input type="number" name="discount" placeholder="Discount (%)" onChange={handleChange} value={form.discount} required />
        <input type="date" name="expiry" onChange={handleChange} value={form.expiry} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Add Coupon</button>
      </form>

      <h3>My Coupons</h3>
      <div className="my-coupons">
        {myCoupons.length === 0 ? (
          <p>No coupons found.</p>
        ) : (
          myCoupons.map(coupon => (
            <div key={coupon.id} className="coupon-card">
              <img src={`http://localhost:5000${coupon.image}`} alt={coupon.title} />
              <h4>{coupon.title}</h4>
              <p>₹{coupon.price} | {coupon.discount}% off</p>
              <p>Expires: {coupon.expiry}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
