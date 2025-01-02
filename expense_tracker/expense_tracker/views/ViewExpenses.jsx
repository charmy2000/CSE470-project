import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewExpenses = ({ userID }) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`/api/expenses/getExpenses/${userID}`);
                setExpenses(response.data);
            } catch (error) {
                alert('Error fetching expenses');
            }
        };

        fetchExpenses();
    }, [userID]);

    return (
        <div>
            <h2>Expenses</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.expenseId}>
                        {expense.category}: {expense.amount} (Date: {expense.date})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewExpenses;
