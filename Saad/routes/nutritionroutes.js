const express = require('express');
const router = express.Router();
const {
  addMeal,
  getMeals,
  updateMeal,
  deleteMeal
} = require('../controllers/nutritioncontroller');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, addMeal)
  .get(protect, getMeals);

router.route('/:id')
  .put(protect, updateMeal)
  .delete(protect, deleteMeal);

module.exports = router;