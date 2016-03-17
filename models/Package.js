var mongoose = require('mongoose');

var packageSchema = mongoose.Schema({
  contents: [],
  lat: Number,
  lng: Number,
  note: String,
  contact: String,
  collection_time: String
},{
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
