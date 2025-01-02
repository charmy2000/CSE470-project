import React, { useState } from 'react';
import axios from 'axios';

const CreateGroup = () => {
    const [formData, setFormData] = useState({ userID: '', group_name: '', members: [] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/sharedExpense/createGroup', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message || 'Error creating group');
        }
    };

    return (
        <div>
            <h2>Create Shared Expense Group</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="User ID" value={formData.userID} onChange={(e) => setFormData({ ...formData, userID: e.target.value })} required />
                <input type="text" placeholder="Group Name" value={formData.group_name} onChange={(e) => setFormData({ ...formData, group_name: e.target.value })} required />
                <input type="text" placeholder="Members (comma-separated)" value={formData.members.join(',')} onChange={(e) => setFormData({ ...formData, members: e.target.value.split(',') })} required />
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default CreateGroup;
