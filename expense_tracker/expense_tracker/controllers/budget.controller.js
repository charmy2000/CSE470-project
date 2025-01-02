const Budget = require('../models/budget.model');

exports.createBudget = async (req, res) => {
  try {
    const { userId, category, limit } = req.body;
    const budget = new Budget({ userId, category, limit });
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget', error });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, limit } = req.body;
    const budget = await Budget.findByIdAndUpdate(
      id,
      { category, limit, updated_at: Date.now() },
      { new: true }
    );
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget', error });
  }
};


exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    await Budget.findByIdAndDelete(id);
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget', error });
  }
};


exports.checkBudget = async (req, res) => {
  try {
    const { userId, category } = req.params;
    const budget = await Budget.findOne({ userId, category });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budget', error });
  }
};
