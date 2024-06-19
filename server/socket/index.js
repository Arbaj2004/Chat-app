const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const dotenv = require('dotenv');
const getUserDetailsFromToken = require('../helper/getUserDetailsFromToken');
const UserModel = require('../models/UserModel');
const { ConversationModel, MessageModel } = require('../models/ConversationModel');
const getConversation = require('../helper/getConversation');
var cron = require('node-cron');

dotenv.config({ path: './config.env' });
const app = express();
//socket connection
const server = http.createServer(app)
console.log("hi i am url:>>>", process.env.FRONTEND_URL);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})

//online user
const onlineUser = new Set()

io.on('connection', async (socket) => {
    // console.log("connect User ", socket.id)

    const token = socket.handshake.auth.token
    // console.log("token", token);
    //current user details fron tojken
    const user = await getUserDetailsFromToken(token)
    // console.log(user);

    //create room
    socket.join(user?._id?.toString())
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUsers', Array.from(onlineUser))

    socket.on('message-page', async (userId) => {
        // console.log("userId", userId);
        const userDetails = await UserModel.findById(userId).select("-password  ");
        // console.log("HI", userDetails);
        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profilePic: userDetails?.profilePic,
            online: onlineUser.has(userId)
        }
        socket.emit('message-user', payload)
        //get previous message
        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: userId },
                { sender: userId, receiver: user?._id }
            ]
        }).populate('messages').sort({ updatedAt: -1 })

        socket.emit('message', getConversationMessage?.messages || [])
    })


    //new message
    socket.on('new message', async (data) => {
        //check conversation available for both user or not 
        let conversation = await ConversationModel.findOne({
            "$or": [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        })
        // console.log("conversation", conversation);
        if (!conversation) {
            const createConversation = await ConversationModel({
                sender: data?.sender,
                receiver: data?.receiver
            })
            conversation = await createConversation.save()
        }
        const message = await MessageModel({
            text: data.text,
            imageUrl: data?.imageUrl,
            videoUrl: data?.videoUrl,
            msgByUserId: data?.sender
        })
        const saveMessage = await message.save()
        const updateConversation = await ConversationModel.updateOne({ _id: conversation?._id }, {
            "$push": { messages: saveMessage?._id }
        })
        const getConversationMsg = await ConversationModel.findOne({
            "$or": [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        }).populate('messages').sort({ updatedAt: -1 })


        io.to(data?.sender).emit('message', getConversationMsg.messages || [])
        io.to(data?.receiver).emit('message', getConversationMsg.messages || [])


        //send conversation
        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        io.to(data?.sender).emit('conversation', conversationSender)
        io.to(data?.receiver).emit('conversation', conversationReceiver)


    })

    //sidebar
    socket.on('sidebar', async (currentUserId) => {
        console.log("current user", currentUserId)

        const conversation = await getConversation(currentUserId)

        socket.emit('conversation', conversation)

    })

    socket.on('seen', async (msgByUserId) => {

        let conversation = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: msgByUserId },
                { sender: msgByUserId, receiver: user?._id }
            ]
        })

        const conversationMessageId = conversation?.messages || []

        const updateMessages = await MessageModel.updateMany(
            { _id: { "$in": conversationMessageId }, msgByUserId: msgByUserId },
            { "$set": { seen: true } }
        )

        //send conversation
        const conversationSender = await getConversation(user?._id?.toString())
        const conversationReceiver = await getConversation(msgByUserId)

        io.to(user?._id?.toString()).emit('conversation', conversationSender)
        io.to(msgByUserId).emit('conversation', conversationReceiver)
    })


    //disconnect
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id?.toString())
        console.log('disconnect user ', socket.id)
    })
});

module.exports = {
    app,
    server
}
