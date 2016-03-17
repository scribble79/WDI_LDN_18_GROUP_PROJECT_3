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

packageSchema.pre('remove', function(next){
  console.log("PRE REMOVE HOOK FIRED!");
  this.model('User').update({ packages: this._id }, {$pull: {packages: this._id }}, { multi:true }, function(err, user) {
    console.log("USER UPDATED", user);
    next(err);
  });
});

module.exports = mongoose.model('Package', packageSchema);
