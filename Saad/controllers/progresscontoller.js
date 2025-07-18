const Progress = require('../models/progress');

exports.addProgress = async (req, res) => {
  const entry = new Progress({ user: req.user.id, ...req.body });
  const saved = await entry.save();
  res.status(201).json(saved);
};

exports.getProgress = async (req, res) => {
  const entries = await Progress.find({ user: req.user.id }).sort({ date: -1 });
  res.json(entries);
};

exports.updateProgress = async (req, res) => {
  const updated = await Progress.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Progress not found' });
  res.json(updated);
};

exports.deleteProgress = async (req, res) => {
  const deleted = await Progress.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Progress not found' });
  res.json({ message: 'Progress deleted' });
};