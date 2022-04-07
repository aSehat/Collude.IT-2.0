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

module.exports = Meeting = mongoose.model('Meeting', meetingSchema);
