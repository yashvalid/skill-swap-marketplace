const socket = require('socket.io');
const User = require('./model/user.model');
const SkillSwap = require('./model/skillSwap.model');

let io;

const userSocketMap = {};

const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId];
} 

const initSocket = async (server) => {
    io = socket(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    })

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('join', async (data) => {
            const { userId } = data;
            userSocketMap[userId] = socket.id;
            const user = await User.findOneAndUpdate({ _id: userId }, { socketId: socket.id }, { new: true });
            const pendingSwaps = await SkillSwap.find({toUser : userId, status : 'pending'}).populate('toUser');
            // pendingSwaps.forEach((swap) => sendMessages(user.socketId, message = {
            //     event: 'swap-request',
            //     data : swap, 
            // }))
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            for (const userId in userSocketMap) {
                if (userSocketMap[userId] === socket.id) {
                    delete userSocketMap[userId];
                    break;
                }
            }
        });
    })
    
}

function sendMessages(socketId, message) {
    console.log("message", message)
    if (io)
        io.to(socketId).emit(message.event, message.data);
    else
        console.log("socket not initialized")
}

module.exports = {
    initSocket,
    sendMessages,
    getReceiverSocketId
}