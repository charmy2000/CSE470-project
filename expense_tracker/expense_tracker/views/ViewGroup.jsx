import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewGroup = ({ userID }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`/api/sharedExpense/getGroups/${userID}`);
        setGroups(response.data);
      } catch (error) {
        alert('Error fetching groups');
      }
    };

    fetchGroups();
  }, [userID]);

  return (
    <div className="container mt-5">
      <h2>My Shared Expense Groups</h2>
      <div className="list-group">
        {groups.map((group) => (
          <div key={group.groupId} className="list-group-item">
            <h5 className="mb-1">{group.group_name}</h5>
            <p className="mb-1">Members: {group.members.join(', ')}</p>
            <small>Created by: {group.createdBy}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewGroup;
