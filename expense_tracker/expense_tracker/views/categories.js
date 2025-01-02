import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', budget: '' });

  const userId = 'YOUR_USER_ID';

  useEffect(() => {
    axios.get(/api/categories/${userId})
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/categories', { ...form, userId })
      .then((res) => {
        setCategories([...categories, res.data]);
        setForm({ name: '', budget: '' });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(/api/categories/${id})
      .then(() => setCategories(categories.filter((category) => category._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Budget"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />
        <button type="submit">Add Category</button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}: ${category.budget}
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;