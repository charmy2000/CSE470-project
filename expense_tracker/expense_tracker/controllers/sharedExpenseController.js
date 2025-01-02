const SharedExpense = require('../models/sharedExpense');

exports.createGroup = async (req, res) => {
    const { userID, group_name, total_amount, members } = req.body;

    try {
        const newGroup = new SharedExpense({
            id: new mongoose.Types.ObjectId(),
            userID,
            group_name,
            total_amount,
            members
        });

        await newGroup.save();
        res.status(201).json({ message: 'Shared Expense Group created successfully', group: newGroup });
    } catch (error) {
        res.status(500).json({ message: 'Error creating group', error: error.message });
    }
};

exports.addSharedExpense = async (req, res) => {
    const { id, amount } = req.body;

    try {
        const group = await SharedExpense.findOne({ id });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        group.total_amount += amount;
        group.updated_at = new Date();

        await group.save();
        res.status(200).json({ message: 'Expense added successfully', group });
    } catch (error) {
        res.status(500).json({ message: 'Error adding shared expense', error: error.message });
    }
};


exports.getGroupSummary = async (req, res) => {
    const { id } = req.params;

    try {
        const group = await SharedExpense.findOne({ id });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching group summary', error: error.message });
    }
};
