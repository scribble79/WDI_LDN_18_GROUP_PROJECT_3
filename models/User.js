var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  avatar: String,
  packages: [{type: mongoose.Schema.ObjectId, ref: 'Package'}],
  email:    { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

// Deletes return of passwordHash for sercurity reasons
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

// Creates virtual field on user schema for password
userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

// Creates virtual field on user schema for password confirmation
userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// Ensures password and password confirmation are the same on registering
userSchema.path('passwordHash')
  .validate(function(passwordHash) {
    if(!this._password) {
      return this.invalidate('password', 'A password is required');
    }
    if(this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match');
    }
  });

// Validates password against the passwordHash on the user instance
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

// Export the User model
module.exports = mongoose.model("User", userSchema);
