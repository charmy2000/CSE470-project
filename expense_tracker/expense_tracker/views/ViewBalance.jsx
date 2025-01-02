import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBalance = ({ userID }) => {
    const [balance, setBalance] = useState({
        totalIncome: 0,
        totalExpense: 0,
        currentBalance: 0
    });

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(`/api/balance/getBalance/${userID}`);
                setBalance({
                    totalIncome: response.data.totalIncome,
                    totalExpense: response.data.totalExpense,
                    currentBalance: response.data.currentBalance
                });
            } catch (error) {
                alert('Error fetching balance');
            }
        };

        fetchBalance();
    }, [userID]);

    return (
        <div>
            <h2>Balance Overview</h2>
            <div>
                <p>Total Income: ${balance.totalIncome}</p>
                <p>Total Expenses: ${balance.totalExpense}</p>
                <p>Current Balance: ${balance.currentBalance}</p>
            </div>
        </div>
    );
};

export default ViewBalance;
