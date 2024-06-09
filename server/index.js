const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const { app, server } = require('./socket/index')

dotenv.config({ path: './config.env' });
//called in socket remove it 
// const app = express();       

// Configure CORS
app.use(cors({
    origin: process.env.FRONTEND_URL, // Ensure this is the correct frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json()); // To parse JSON data from POST requests
app.use(cookieParser()); // To parse cookies

// Simple route to test if the server is running
app.get('/', (request, response) => {
    response.json({
        message: "server running fine"
    });
});

// API endpoints
app.use('/api', router);

const PORT = process.env.PORT || 8000;

// DB connection
mongoose
    .connect(process.env.MONGODB_URI, {

    })
    .then(() => {
        console.log("DB connection success👌");
    })
    .catch((error) => console.log(`${error} ${process.env.PORT} did not connect`));

// Start the server
server.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`);
});
