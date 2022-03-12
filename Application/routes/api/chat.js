const express = require('express');

// Want to use middleware
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Chat = require('../../models/Chat');

const router = express.Router();

// @route       Post api/chat
// @desc        Create or Fetch one-to-one chat
// @access      Public
router.post('/', auth, async (req, res) => {
    const { userId } = req.body;
    console.log(req.body);

    if (!userId) {
        console.log("UserId param not sent with the request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id } }},
            { users: { $elemMatch: { $eq: userId }}},
        ]
    }).populate("users", "-password")
    .populate("latestMessage");

    console.log(isChat);
    
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createdChat._id })
                                        .populate("users", "-password");

            res.status(200).send(FullChat);
        } catch (err) {
            res.status(400);
            throw new Error(err.message);
        }
    }
});

// @route       Get api/chat
// @desc        Fetch all chats for the user
// @access      Public
router.get('/', auth, (req,res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user.id }}})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name email"
                });

                res.status(200).send(results);
            });
    }
    catch(err) {
        res.status(400);
        throw new Error(err.message);
    }
});



module.exports = router;