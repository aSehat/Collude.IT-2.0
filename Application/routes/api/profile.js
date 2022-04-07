const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { check, validationResult } = require('express-validator');

// Want to use middleware
const auth = require('../../middleware/auth');

// Using 'Meeting' model
const Profile = require('../../models/Profile');

// @route       GET api/profile
// @desc        Get profile for a given user
// @access      Private
router.get('/:userId', auth, async (req, res) => {
	try {
		// Find user information - password from User collection
		const profile = await Availability.findOne({ user: req.params.userId });
		if (!profile) {
			return res.status(404).json({ msg: 'User not found' });
		}

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       POST api/profile
// @desc        Add a singular slot of availability
// @access      Private
router.put('/availability', auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { startDate, endDate, repeat } = req.body;

	try {
		let profile = await Profile.findOne({ user: req.user.id });
		// If there is already an availability for this user, update it
		if (profile) {
			const newAvail = {
				startDate: startDate,
				endDate: endDate,
				repeat: repeat,
			};
			profile.availabilities.unshift(newAvail);
			await profile.save();

			return res.json(profile.availabilities);
		}

		const availFields = {};

		const newRange = [
			{
				startDate: startDate,
				endDate: endDate,
				repeat: repeat,
			},
		];

		availFields.user = req.user.id;
		availFields.availabilities = newRange;
		profile = new Profile(availFields);
		await profile.save();
		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       DELETE api/profile/availability/:id
// @desc        Delete a slot of availability
// @access      Private
router.delete('/availability/:id', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.user.id });

		// If there is already an availability for this user, update it
		if (profile) {
			profile.availabilities = profile.availabilities.filter(
				(avail) => avail.id !== req.params.id
			);
			await profile.save();

			return res.json(profile.availabilities);
		}
		return res
			.status(404)
			.json({ msg: 'User has no listed availabilities' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
