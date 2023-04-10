const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
      default: 'Your Thoughts',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formateDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// The virtual property `reactionCount` gets the count of reaction per any thought;
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Getter function to format date on query
function formateDate(currentDate) {
  return dayjs(currentDate).format('MMM DD, YYYY [at] hh:mm a');
}


const Thought = model('thought', thoughtSchema, 'thought');

module.exports = Thought;

