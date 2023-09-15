const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personRoutes = require('./route/person.route');
const dotenv = require('dotenv');

dotenv.config()

const app = express();

const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check the database connection status
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

app.use(bodyParser.json());

app.use('/api', personRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});