const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budget.controller');

router.post('/', budgetController.createBudget);
router.put('/:id', budgetController.updateBudget);
router.delete('/:id', budgetController.deleteBudget);
router.get('/:userId/:category', budgetController.checkBudget);

module.exports = router;Console.log("");