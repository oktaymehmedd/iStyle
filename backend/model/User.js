const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

userSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User