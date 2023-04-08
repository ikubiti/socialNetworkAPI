const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      Unique: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      Unique: true,
      max_length: 50,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// The virtual property `friendCount` gets the count of friends per user;
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema, User);

module.exports = User;
