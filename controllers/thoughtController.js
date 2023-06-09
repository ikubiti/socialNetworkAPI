const { Thought, User } = require('../models');

module.exports = {
	// Get all thoughts
	getThoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Get a single thought
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought with that ID' })
					: res.json(thought)
			)
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// create a new thought
	createThought(req, res) {
		Thought.create(req.body)
			.then(async (thought) => {
				await User.findOneAndUpdate(
					{ _id: req.body.userId },
					{ $addToSet: { thoughts: thought._id } },
					{ runValidators: true, new: true }
				);
				res.json(thought);
			})
			.catch((err) => res.status(500).json(err));
	},
	// Update a thought
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought with this id!' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Delete a thought
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought with that ID' })
					: (
						User.findOneAndUpdate(
							{ username: thought.username },
							{ $pull: { thoughts: thought._id } },
							{ runValidators: true, new: true }
						).then(() => res.json({ message: 'Thought successfully deleted!' })))
			)
			.catch((err) => res.status(500).json(err));
	},
	// Add a reaction to a thought
	addReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res
						.status(404)
						.json({ message: 'No Thought found with that ID :(' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Remove a reaction to a thought
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No Thought or Reaction found with that ID :(' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
};
