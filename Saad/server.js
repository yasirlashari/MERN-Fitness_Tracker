const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/users', require('./routes/userroutes'));
app.use('/api/workouts', require('./routes/workoutroutes'));
app.use('/api/nutrition', require('./routes/nutritionroutes'));
app.use('/api/progress', require('./routes/progressroutes'));

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));