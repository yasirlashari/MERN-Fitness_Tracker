const Workout = require('../models/workout');

exports.createWorkout = async (req, res) => {
  const workout = new Workout({ user: req.user.id, ...req.body });
  const saved = await workout.save();
  res.status(201).json(saved);
};

exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
  res.json(workouts);
};

exports.updateWorkout = async (req, res) => {
  const updated = await Workout.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Workout not found' });
  res.json(updated);
};

exports.deleteWorkout = async (req, res) => {
  const deleted = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Workout not found' });
  res.json({ message: 'Workout deleted' });
};