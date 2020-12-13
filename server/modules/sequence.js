
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  maxPassageId: { type: Number, required: true },
});

module.exports = mongoose.model('Sequence', schema);
