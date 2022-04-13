const express = require('express');

// Want to use middleware
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Chat = require('../../models/Chat');
const Message = require('../../models/Message');

const router = express.Router();

// @route       Post api/message
// @desc        Sending a new message
// @access      Public
// router.post('/', auth, async (req, res) => {
// 	const { content, chatId } = req.body;

// 	if (!content || !chatId) {
// 		console.log('Invalid data passed into request');
// 		return res.sendStatus(400);
// 	}

// 	var newMessage = {
// 		sender: req.user.id,
// 		content: content,
// 		chat: chatId,
// 	};

// 	try {
// 		var message = await Message.create(newMessage);

// 		message = await message.populate('sender', 'name');
// 		message = await message.populate('chat');
// 		message = await User.populate(message, {
// 			path: 'chat.users',
// 			select: 'name email',
// 		});

// 		await Chat.findByIdAndUpdate(req.body.chatId, {
// 			latestMessage: message,
// 		});

// 		res.json(message);
// 	} catch (error) {
// 		res.status(400);
// 		throw new Error(error.message);
// 	}
// });

router.post('/', auth, async (req, res) => {
	//  const { content, chatId } = req.body;

	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	// }

	//     // Destructure request body to access parameters loosely
	const { content, chatId, meetingTitle, startDate } = req.body;

	// Build profile object
	const newMessage = {};
	newMessage.sender = req.user.id;
	newMessage.chat = chatId;
	newMessage.content = content;

	if (meetingTitle) {
		newMessage.meetingTitle = meetingTitle;
	}
	if (startDate) {
		newMessage.startDate = startDate;
	}

	try {
		var message = await Message.create(newMessage);

		message = await message.populate('sender', 'name');
		message = await message.populate('chat');
		message = await User.populate(message, {
			path: 'chat.users',
			select: 'name email',
		});

		await Chat.findByIdAndUpdate(req.body.chatId, {
			latestMessage: message,
		});
		res.json(message);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

router.get('/:chatId', auth, async (req, res) => {
	try {
		const messages = await Message.find({ chat: req.params.chatId })
			.populate('sender', 'name email')
			.populate('chat');

		res.json(messages);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//  const messageSchema = mongoose.Schema(
// 	{
// 		sender: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: 'user',
// 		},
// 		content: {
// 			type: String,
// 			trim: true,
// 		},
// 		chat: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: 'Chat',
// 		},
// 		meetingTitle: {
// 			type: String,
// 			trim: true,
// 		},
// 		meetingAdmin: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: 'user',
// 		},
// 		startDate: {
// 			type: Date,
// 		},
// 		endDate: {
// 			type: Date,
// 		},
// 		accepted: {
// 			type: Boolean,
// 		},
// 	},
// 	{
// 		timestamp: true,
// 	}
// );

// // @route       POST api/message
// // @desc        Create or update user profile
// // @access      Private
// router.post('/', auth, async (req, res) => {
//     const errors = validationResult(req);
//     if (! errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()});
//     }

//     // Destructure request body to access parameters loosely
//     const {
//         teetorType,
//         bio,
//         location,
//         languages,
//         skills,
//     } = req.body;

//     // Build profile object
//     const profileFields = {};
//     profileFields.user = req.user.id;
//     if (teetorType) {
//         profileFields.teetorType = teetorType;
//     }
//     if (bio) {
//         profileFields.bio = bio;
//     }
//     if (location) {
//         profileFields.location = location;
//     }
//     if (languages) {
//         profileFields.languages = languages.split(',').map(languages => languages.trim());
//     }
//     if (skills) {
//         profileFields.skills = skills.split(',').map(skills => skills.trim());
//     }

//     try {
//         let profile = await Profile.findOne({user: req.user.id});
//         // If profile already exists
//         if (profile) {
//             profile = await Profile.findOneAndUpdate({
//                 user: req.user.id
//             }, {
//                 $set: profileFields
//             }, {new: true});

//             return res.json(profile);
//         }

//         // Create profile
//         profile = new Profile(profileFields);

//         await profile.save();
//         res.json(profile);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;
