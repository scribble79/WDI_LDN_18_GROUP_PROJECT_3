var mongoose = require('mongoose');

var packageSchema = mongoose.Schema({
  contents: [],
  lat: Number,
  lng: Number,
},{
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
