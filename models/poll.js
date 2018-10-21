const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  /*author: String,
  creationDate: Date,
  options: [Object]*/
});

module.exports = mongoose.model('Poll', PollSchema);