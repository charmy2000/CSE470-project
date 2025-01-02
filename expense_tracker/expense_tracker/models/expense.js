const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expenseId: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Expense', expenseSchema);
