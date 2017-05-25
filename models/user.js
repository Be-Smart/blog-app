const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true}
});

UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  })
});

UserSchema.methods.comparePassword = function(candidatePass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePass, this.password)
      .then(isMatch => resolve(isMatch))
      .catch(err => reject(err));
  });
}

const User = mongoose.model('user', UserSchema);

module.exports = User;
