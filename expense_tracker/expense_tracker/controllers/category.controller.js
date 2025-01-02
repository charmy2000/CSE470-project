const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  try {
    const { userId, name, budget } = req.body;
    const category = new Category({ userId, name, budget });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const { userId } = req.params;
    const categories = await Category.find({ userId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, budget } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, budget, updated_at: Date.now() },
      { new: true }
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};