const { User, Thought } = require('../models');

module.exports = {
	// Get all users
	getUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	// Get a single user by Id
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.populate({ path: 'thoughts', select: '-__v' })
			.populate({ path: 'friends' })
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user with that ID' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Create a user
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Delete a user and remove all their thoughts
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user with that ID' })
					: Thought.deleteMany({ _id: { $in: user.thoughts } }).then(() => res.json({ message: 'User and thoughts deleted!' }))
			)
			.catch((err) => res.status(500).json(err));
	},
	// Update a user
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user with this id!' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},

	// Add a friend to a user's friends list
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.body } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res
						.status(404)
						.json({ message: 'No user found with that ID :(' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Remove a friend from a user's friends list
	removeFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res
						.status(404)
						.json({ message: 'No user found with that ID :(' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
};