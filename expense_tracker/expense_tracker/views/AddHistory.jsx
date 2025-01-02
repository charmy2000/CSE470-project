import React, { useState } from 'react';
import axios from 'axios';

const AddHistory = () => {
    const [formData, setFormData] = useState({ 
        userID: '', 
        transactionType: '',
        category: '',
        amount: '',
        description: '',
        date: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/history/addHistory', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message || 'Error adding history');
        }
    };

    return (
        <div>
            <h2>Add Transaction History</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="User ID" 
                    value={formData.userID}
                    onChange={(e) => setFormData({...formData, userID: e.target.value})}
                    required
                />
                <select 
                    value={formData.transactionType}
                    onChange={(e) => setFormData({...formData, transactionType: e.target.value})}
                    required
                >
                    <option value="">Select Transaction Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input 
                    type="text"
                    placeholder="Category" 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                />
                <input 
                    type="number"
                    placeholder="Amount" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                />
                <input 
                    type="text"
                    placeholder="Description" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <input 
                    type="date"
                    placeholder="Date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                />
                <button type="submit">Add History</button>
            </form>
        </div>
    );
};

export default AddHistory;

