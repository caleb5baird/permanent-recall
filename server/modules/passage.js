
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id:          { type: String, required: true },
  prompt:      { type: String, required: true },
  reference:   { type: String, required: true },
  text:        { type: String, required: true },
  reviews:    [{ type: Date }],
});

module.exports = mongoose.model('Passage', schema);
