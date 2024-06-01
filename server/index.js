const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')

dotenv.config({ path: './config.env' })

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())     //to get json data from post requests otherwise give error of destructured data //this is middleware which call for every req
app.use(cookiesParser())     //to get token from cookies 

app.get('/', (request, response) => {
    response.json({
        message: "server running fine"
    })
})

//api endpoints
app.use('/api', router)

const PORT = process.env.PORT || 8000

//DB connection
mongoose
    .connect(process.env.MONGODB_URI, {
    })
    .then(() => {
        console.log("DB connection success👌");
    })
    .catch((error) => console.log(`${error} ${process.env.PORT} did not connect`));


app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`)
})
