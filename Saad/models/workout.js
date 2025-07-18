const mongoose = require("mongoose");

const exerciseSchema =  new mongoose.Schema({
    name: { type: String, required: true},
    sets: Number,
    reps: Number,
    weight: Number,
    notes:String

});

const workoutSchema = new mongoose.Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     date: { type: Date, default: Date.now },
     category: { type: String, enum: ['strength', 'cardio', 'flexibility'], required: true },
     exercises: [exerciseSchema]
},{
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
