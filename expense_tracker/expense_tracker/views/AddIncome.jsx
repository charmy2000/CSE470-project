import React, { useState } from 'react';
import axios from 'axios';

const AddIncome = () => {
    const [formData, setFormData] = useState({ userID: '', source: '', amount: '', description: '', date: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/income/addIncome', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message || 'Error adding income');
        }
    };

    return (
        <div>
            <h2>Add Income</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="User ID" value={formData.userID} onChange={(e) => setFormData({ ...formData, userID: e.target.value })} required />
                <input type="text" placeholder="Source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} required />
                <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
                <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <input type="date" placeholder="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                <button type="submit">Add Income</button>
            </form>
        </div>
    );
};

export default AddIncome;

