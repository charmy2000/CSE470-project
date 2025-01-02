import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ category: '', limit: '' });

  const userId = 'YOUR_USER_ID';

  useEffect(() => {
    axios.get(/api/budget/${userId})
      .then((res) => setBudgets(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/budget', { ...form, userId })
      .then((res) => {
        setBudgets([...budgets, res.data]);
        setForm({ category: '', limit: '' });
      })
      .catch((err) => console.error(err));
  };


  const handleDelete = (id) => {
    axios.delete(/api/budget/${id})
      .then(() => setBudgets(budgets.filter((budget) => budget._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Budget Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Limit"
          value={form.limit}
          onChange={(e) => setForm({ ...form, limit: e.target.value })}
          required
        />
        <button type="submit">Add Budget</button>
      </form>

      <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            {budget.category}: ${budget.limit}
            <button onClick={() => handleDelete(budget._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budget;