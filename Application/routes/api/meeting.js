// Add users to a meeting
// Remove schema
// Question to adjust lower code:
// Is the meeting admin the user that created the meeting?
// How are conversations organized... add multiple users to a meeting

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = mongoose.Schema({
	meetingTitle: {
		type: String,
		trim: true,
		required: true,
	},
	meetingAdmin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
	],
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	accepted: {
		type: Boolean,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { check, validationResult } = require('express-validator');

// Want to use middleware
const auth = require('../../middleware/auth');

// Using 'Meeting' model
const Meeting = require('../../models/Meeting');

// @route       POST api/meeting
// @desc        Create a new meeting
// @access      Private
router.post('/:meetingAdmin', auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { meetingTitle, startDate, endDate } = req.body;

	try {
		// Create new meeting
		const meeting = new Meeting({
			meetingTitle,
			meetingAdmin: req.user.id,
			startDate,
			endDate,
		});

		// Save meeting
		await meeting.save();

		res.json(meeting);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       GET api/meeting
// @desc        Get all meetings
// @access      Private
router.get('/', auth, async (req, res) => {
	try {
		const meetings = await Meeting.find({ meetingAdmin: req.user.id });
		res.json(meetings);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       GET api/meeting/:meetingId
// @desc        Get a single meeting
// @access      Private
router.get('/:meetingId', auth, async (req, res) => {
	try {
		const meeting = await Meeting.findById(req.params.meetingId);

		if (!meeting) {
			return res.status(404).json({ msg: 'Meeting not found' });
		}

		res.json(meeting);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Meeting not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route       DELETE api/meeting/:meetingId
// @desc        Delete a meeting
// @access      Private
router.delete('/:meetingId', auth, async (req, res) => {
	try {
		const meeting = await Meeting.findById(req.params.meetingId);

		if (!meeting) {
			return res.status(404).json({ msg: 'Meeting not found' });
		}

		// Check if user is meeting admin
		if (meeting.meetingAdmin.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await meeting.remove();

		res.json({ msg: 'Meeting removed' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Meeting not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route       PUT api/meeting/accept/:meetingId
// @desc        Accept a meeting
// @access      Private
router.put('/accept/:meetingId', auth, async (req, res) => {
	try {
		const meeting = await Meeting.findById(req.params.meetingId);

		if (!meeting) {
			return res.status(404).json({ msg: 'Meeting not found' });
		}

		// Check if user is meeting admin
		if (meeting.meetingAdmin.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		// Check if meeting is already accepted
		if (meeting.accepted) {
			return res.status(400).json({ msg: 'Meeting already accepted' });
		}

		meeting.accepted = true;

		await meeting.save();

		res.json(meeting);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Meeting not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route       PUT api/meeting/:meetingId
// @desc        Decline a meeting
// @access      Private
router.put('/decline/:meetingId', auth, async (req, res) => {
	try {
		const meeting = await Meeting.findById(req.params.meetingId);

		if (!meeting) {
			return res.status(404).json({ msg: 'Meeting not found' });
		}

		// Check if user is meeting admin
		if (meeting.meetingAdmin.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		// Check if meeting is already declined
		if (meeting.accepted === false) {
			return res.status(400).json({ msg: 'Meeting already declined' });
		}

		meeting.accepted = false;

		await meeting.save();

		res.json(meeting);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Meeting not found' });
		}
		res.status(500).send('Server Error');
	}
});

// // @route       GET api/profile
// // @desc        Get profile for a given user
// // @access      Private
// router.get('/:userId', auth, async (req, res) => {
// 	try {
// 		// Find user information - password from User collection
// 		const profile = await Profile.findOne({ user: req.params.userId });
// 		if (!profile) {
// 			return res.status(404).json({ msg: 'User not found' });
// 		}

// 		return res.json(profile);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });
