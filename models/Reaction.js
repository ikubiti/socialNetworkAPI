const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

// Reaction Schema definition
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
      default: 'Your reaction',
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formateDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Getter function to format date on query
function formateDate(currentDate) {
  return dayjs(currentDate).format('MMM DD, YYYY [at] hh:mm a');
}

module.exports = reactionSchema;
