const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
	// Get all thoughts
	getThoughts(req, res) {
		res.send('To be implemented');
	},
	// Get a single thought
	getSingleThought(req, res) {
		res.send('To be implemented');
	},
	// create a new thought
	createThought(req, res) {
		res.send('To be implemented');
	},
	// Update a thought
	updateThought(req, res) {
		res.send('To be implemented');
	},
	// Delete a thought
	deleteThought(req, res) {
		res.send('To be implemented');
	},
	// Add a reaction to a thought
	addReaction(req, res) {
		res.send('To be implemented');
	},
	// Remove a reaction to a thought
	deleteReaction(req, res) {
		res.send('To be implemented');
	},
	// Update a reaction to a thought
	updateReaction(req, res) {
		res.send('To be implemented');
	},
};
