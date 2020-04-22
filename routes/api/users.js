const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const User = require("../../models/User");
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validatePwdresetInput = require('../../validation/pwdreset');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body)
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if (user){
        return res.status(400).json({email: 'Email already exists!'})
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        });
      }
    })
    .catch(err => console.log(err))
});

// @route   GET api/users/rstpwd
// @desc    Reset the password -- Forgot password logic
// @access  Public
router.post('/rstpwd', (req,res) => {

  const { errors, isValid } = validatePwdresetInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }
 
  const pwdreset = {}
  pwdreset.email = req.body.email;
  pwdreset.password = req.body.password;

  bcrypt.genSalt(10, (err, salt) => {
     if (err) throw err;
    bcrypt.hash(pwdreset.password, salt, (err, hash) => {
      pwdreset.password = hash;
      // pwdreset.save()
      //   .then(pwdreset => res.json(pwdreset))
      //   .catch(err => console.log(err))
    })
  });

  User.findOne({email: req.body.email})
  .then(user => {
    if (!user){
      return res.status(404).json({email: 'User not found!'});
    } else {
      User.findOneAndUpdate(
        { "email" : req.body.email },
        { $set: { "password" : pwdreset.password } },
        { new: true }
      ).then(user => res.json(user));
    }
  })
  .catch(err => console.log(err))
});


// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req,res)=> {

  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if (!user){
        return res.status(404).json({email: 'User not found!'});
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch){
              //User matched
              //payload
              const payload = {
                id: user.id, 
                name: user.name, 
                avatar: user.avatar};
              
                //sign token

                jwt.sign(
                  payload, 
                  keys.secretOrKey, 
                  {expiresIn: 60}, 
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    })
                  } )

            } else {
              return res.status(400).json({password: 'Password incorrect!'});
            }
          })
      }
    })
    .catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    Return current user information
// @access  Private
router.get('/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;