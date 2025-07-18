const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    item:{type: String, required: true},
    quantity: String,
    calories: Number,
    protein: Number,
    cards: Number,
    fat: Number
});

const nutritionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user',required: true},
    date: { type: Date, default: Date.now },
    mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  foods: [foodItemSchema]

},{
    timestamps: true
});
module.exports = mongoose.model('Nutrition', nutritionSchema);