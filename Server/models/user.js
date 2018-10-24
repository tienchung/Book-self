const mongoose = require("mongoose");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);
const SAL_I = 10;

const userShema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    maxlength: 100
  },
  lastname: {
    type: String,
    maxlength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userShema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcypt.genSalt(SAL_I, function(err, salt) {
      if (err) return next(err);

      bcypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userShema.methods.comparePassword = function(candidatePassword, cb) {
  bcypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userShema.methods.generateToken = function(cb) {
  var user = this;

  var token = jwt.sign(user._id.toHexString(), config.SECRET);
  user.token = token;
  user.save(function(err, user) {
    cb(null, user);
  });
};

//check token
userShema.statics.findByToken = function(token, cb) {
  var user = this;
  // console.log('zo userschema',user)
  jwt.verify(token, config.SECRET, function(err, decode) {
    // console.log(token)
    // console.log(decode)
    user.findOne({ "_id": decode, "token": token },
      function(err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
  });
};

userShema.methods.deleteToken = function(token, cb){
  // console.log(token)
  var user=this;
  // console.log(user)
  user.update({$unset:{token:1}}, (err, user)=>{
    if (err) return cb(err);
    cb(null, user);
  })
}

const User = mongoose.model("User", userShema);
module.exports = { User };
