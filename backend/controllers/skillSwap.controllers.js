const skillSwapService = require('../services/skillSwap.services');
const {validationResult} = require('express-validator');

module.exports.requestSwap = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });
    const { fromUser, toUser, offersSkill, requestsSkill } = req.body;

    try{
        const skillSwap = await skillSwapService.requestSwap({
            fromUser,
            toUser,
            offersSkill,
            requestsSkill
        });
        return res.status(201).json({ message: "Skill swap request created successfully", skillSwap });
    } catch(err){
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.acceptSwapRequest = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });
    const { requestId } = req.query;

    try{
        const skillSwap = await skillSwapService.acceptSwapRequest(requestId);
        return res.status(200).json({ message: "Skill swap request accepted successfully", skillSwap });
    } catch(err){
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.rejectSwap = async (req,res) =>{
    const error = validationResult(req);
    if(!error.isEmpty())
        return res.status(404).json({error : "id is required"});

    const {requestId} = req.query;

    try{
        const skillSwap = await skillSwapService.rejectSwap(requestId);
        console.log(skillSwap)
        return res.status(201).json({message : "Swap rejected"});
    } catch(err){
        return res.status(500).json({error : "internal server error"});
    }
}

module.exports.getAllAcceptedSwaps = async (req, res) =>{
    try{
        const allUsers = await skillSwapService.getAllAcceptedSwaps(req.user._id);
        return res.status(201).json({ allUsers});
    } catch(err){
        return res.status(500).json({error : "Internal Server error"});
    }
}

module.exports.getPendingSwaps = async (req,res) =>{
    try{
        const pendingSwaps = await skillSwapService.getPendingSwaps(req.user._id);
        return res.status(201).json({pendingSwaps});
    } catch(err){
        return res.status(500).json({error : "internal server error"});
    }
}