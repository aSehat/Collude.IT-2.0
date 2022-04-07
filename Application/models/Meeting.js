const mongoose = require('mongoose');

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
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
