const SkillSwap = require('../model/skillSwap.model');
const User = require('../model/user.model');
const { sendMessages, getReceiverSocketId } = require('../socket');

module.exports.requestSwap = async ({ fromUser, toUser, offersSkill, requestsSkill }) => {
    try {
        const skillSwap = await SkillSwap.create({
            fromUser,
            toUser,
            offersSkill,
            requestsSkill
        });
        const toUserSocketId = getReceiverSocketId(toUser);
        // const fromUserData = await User.findOne({ _id: fromUser })
        const swapReq = await SkillSwap.findOne({_id : skillSwap._id}).populate('fromUser');
        sendMessages(toUserSocketId, {
            event: 'swap-request',
            data: {
                swapReq
            },
        });
        return skillSwap;
    } catch (err) {
        console.log(err);
        throw new Error("Error creating skill swap request");
    }
}

module.exports.acceptSwapRequest = async (requestId) => {
    try {
        const acceptSwap = await SkillSwap.findOneAndUpdate(
            { _id: requestId },
            { status: 'accepted' },
            { new: true }
        );
        const user = await User.findOne({ _id: acceptSwap.fromUser })
        sendMessages(user.socketId, message = {
            event: 'swap-accepted',
            data: user,
            swapId: acceptSwap._id,
        })
        return acceptSwap
    } catch (err) {
        console.log(err);
        throw new Error("Error accepting skill swap request");
    }
}

module.exports.rejectSwap = async (requestId) => {
    try {
        const skillSwap = await SkillSwap.findById({ _id: requestId }).populate('fromUser');
        if (!skillSwap) {
            throw new Error("Skill swap request not found");
        }
        await SkillSwap.deleteOne({ _id: requestId });
        console.log("rejecting", skillSwap);
        sendMessages(skillSwap.fromUser.socketId, skillSwap.fromUser);
        return skillSwap;
    } catch (err) {
        console.log(err);
        throw new Error("Error rejecting skill swap request");
    }
}

module.exports.getAllAcceptedSwaps = async (currUserId) => {
    try {
        const users = await SkillSwap.find({
            status: 'accepted',
            $or: [
                { fromUser: currUserId },
                { toUser: currUserId }
            ]
        }).populate('fromUser').populate('toUser');

        const otherUsers = users.map(user => {
            const isFrom = user.fromUser._id.toString() === currUserId.toString();
            const otherUser = isFrom ? user.toUser : user.fromUser;

            return {
                otherUser,
                requestedSkill: isFrom ? user.requestsSkill : user.offersSkill
            };
        });
        const uniqueUsers = Array.from(
            new Map(
              otherUsers.map(entry => [entry.otherUser._id.toString(), entry])
            ).values()
          );
        return uniqueUsers;
    } catch (err) {
        throw new Error('Couldnt get the data');
    }
}

module.exports.getPendingSwaps = async (userId) =>{
    try{
        const pendindSwaps = await SkillSwap.find({toUser : userId, status : 'pending'}).populate('fromUser');
        return pendindSwaps;
    } catch(err){
        throw new Error(err);
    }
}