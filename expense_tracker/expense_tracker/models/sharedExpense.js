const mongoose = require('mongoose');


const sharedExpenseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    group_name: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    members: {
        type: [String],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('SharedExpense', sharedExpenseSchema);
