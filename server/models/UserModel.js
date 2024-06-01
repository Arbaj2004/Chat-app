const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide name"]
    },
    email: {
        type: String,
        required: [true, "provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true     //this will note the timestamp of user created or updated 
})

const UserModel = mongoose.model('User', userSchema)        //here User is table name of this model

module.exports = UserModel