import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewHistory = ({ userID }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`/api/history/getHistory/${userID}`);
                setHistory(response.data);
            } catch (error) {
                alert('Error fetching transaction history');
            }
        };

        fetchHistory();
    }, [userID]);

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {history.map((transaction) => (
                    <li key={transaction.historyId}>
                        {transaction.transactionType}: {transaction.category} - ${transaction.amount}
                        <br/>
                        Description: {transaction.description}
                        <br/> 
                        Date: {transaction.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewHistory;
