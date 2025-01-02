const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    historyId: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('History', historySchema);
