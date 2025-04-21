const express = require('express');
const {body, query} = require('express-validator');
const SkillSwap = require('../model/skillSwap.model');
const router = express.Router();
const skillSwapController = require('../controllers/skillSwap.controllers');
const authMiddleware = require('../middlewares/authentication');


router.post('/request-swap', 
    body('fromUser').notEmpty().withMessage('From user is required'),
    body('toUser').notEmpty().withMessage('To user is required'),
    body('offersSkill').notEmpty().withMessage('Offers skill is required'),
    body('requestsSkill').notEmpty().withMessage('Requests skill is required'),
    authMiddleware.authUser,
    skillSwapController.requestSwap
)

router.get('/accept-request-swap',
    query('requestId').notEmpty().withMessage('Request ID is required'),
    authMiddleware.authUser,
    skillSwapController.acceptSwapRequest
)

router.get('/reject-request-swap',
    query('requestId').notEmpty().withMessage('Request id is required'),
    authMiddleware.authUser,
    skillSwapController.rejectSwap,
)

router.get('/accepted-swaps',
    authMiddleware.authUser,
    skillSwapController.getAllAcceptedSwaps,
)

router.get('/get-pending-swaps',
    authMiddleware.authUser,
    skillSwapController.getPendingSwaps,
)
module.exports = router;