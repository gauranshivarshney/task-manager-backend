const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/teams')
const taskRoutes = require('./routes/tasks')
const dashboardRoutes = require('./routes/dashboard')

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://gauranshivarshney.github.io'],
  credentials: true
}))

app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/teamMembers', teamRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/dashboard', dashboardRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});