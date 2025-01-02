const mongoose = require('mongoose');


const balanceSchema = new mongoose.Schema({
    balanceId: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    totalIncome: {
        type: Number,
        default: 0
    },
    totalExpenses: {
        type: Number,
        default: 0
    },
    availableBalance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Balance', balanceSchema);
