const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./server')
const { server } = require('./socket/index')

dotenv.config({ path: './config.env' });    //use it in this order read path first

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {

    })
    .then(() => {
        console.log("connection success👌");

    })
    .catch((error) => console.log(`${error} ${process.env.PORT} did not connect`));



server.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
