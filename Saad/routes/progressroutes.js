const express = require('express');
const router = express.Router();
const {
  addProgress,
  getProgress,
  updateProgress,
  deleteProgress
} = require('../controllers/progresscontoller');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, addProgress)
  .get(protect, getProgress);

router.route('/:id')
  .put(protect, updateProgress)
  .delete(protect, deleteProgress);

module.exports = router;
