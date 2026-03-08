const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

const connectDB = require('./config/database');
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
