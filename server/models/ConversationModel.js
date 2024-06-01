const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    }, imageUrl: {
        type: String,
        default: ""
    }, videoUrl: {
        type: String,
        default: ""
    }, seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,      //incase to populate the data i.e to get userinfo from his id
        required: true,
        refer: 'User'                        //user refer and id belong to User table so refer it
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refer: 'User'
    },
    messages: [          //this is array of messages 
        {
            type: mongoose.Schema.objectId,
            refer: 'Message'                 //creating new module for messages
        }
    ]
}, {
    timestamps: true
})

const MessageModel = mongoose.model('Message', messageSchema)
const ConversationModel = mongoose.model('Conversation', conversationSchema)

module.exports = { MessageModel, ConversationModel }