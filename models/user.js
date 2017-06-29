/* eslint consistent-return: 0*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', function (next) { // eslint-disable-line func-names
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }

      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePass) { // eslint-disable-line func-names
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePass, this.password)
      .then(isMatch => resolve(isMatch))
      .catch(err => reject(err));
  });
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
