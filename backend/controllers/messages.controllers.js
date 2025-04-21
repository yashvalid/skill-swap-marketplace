const { validationResult } = require('express-validator');
const messagesService = require('../services/messages.services');
const { getReceiverSocketId, sendMessages } = require('../socket')

module.exports.getMessages = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(404).json({ error: errors });

    const { userToChatId } = req.query;
    try {
        const messages = await messagesService.getMessages(req.user._id, userToChatId);
        return res.status(201).json({ messages: messages });
    } catch (err) {
        return res.status(500).json({ error: "internal server error" });
    }
}

module.exports.sendMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(404).json({ error: errors });

    const { text, receiverId } = req.body;
    try {
        const messages = await messagesService.sendMessage(text, receiverId, req.user._id);
        const receiverSocketID = getReceiverSocketId(receiverId);
        if (receiverSocketID)
            sendMessages(receiverSocketID, message = {
                event: 'new-message',
                data: messages
            });
        return res.status(201).json({messages});
    } catch(err){
        return res.status(500).json({error : 'internal server error'});
    }
}