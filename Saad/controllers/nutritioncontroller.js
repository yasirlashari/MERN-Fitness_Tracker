const Nutrition = require("../models/nutrition");

exports.addMeal = async (req, res) =>{
    const meal = new Nutrition ({ user: req.user.id,...req.body });
    const saved = await meal.save();
    res.status(201).json(saved);
};
exports.getMeals = async (req, res) => {
  const meals = await Nutrition.find({ user: req.user.id }).sort({ date: -1 });
  res.json(meals);
};

exports.updateMeal = async (req, res) => {
  const updated = await Nutrition.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Meal not found' });
  res.json(updated);
};

exports.deleteMeal = async (req, res) => {
  const deleted = await Nutrition.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Meal not found' });
  res.json({ message: 'Meal deleted' });
};