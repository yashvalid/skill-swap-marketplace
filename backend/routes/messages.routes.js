const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middlewares/authentication');
const { query, body } = require('express-validator');
const messagesController = require('../controllers/messages.controllers')

router.get('/get-messages',
    query('userToChatId').notEmpty().withMessage('UserToChatId is required'),
    authMiddleWare.authUser,
    messagesController.getMessages
);

router.post('/send-message',
    body('text').notEmpty().withMessage('message is required'),
    body('receiverId').notEmpty().withMessage('receiverID is required'),
    authMiddleWare.authUser,
    messagesController.sendMessage
)

module.exports = router;