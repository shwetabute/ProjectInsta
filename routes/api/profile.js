const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load profile module
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");
// Load Validation
const validateProfileInput = require("../../validation/profile");

//@route POST api/profile
//@desc  create or edit user profile
//@access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //Check validation
    if (!isValid) {
      //Return error with 400 status
      return res.status(400).json(errors);
    }
    //Get Fields
    //Check this for optional fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    //For insta additional fields
    if (req.body.phonenumber) profileFields.phonenumber = req.body.phonenumber;
    if (req.body.location) profileFields.location = req.body.location;

    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.profilePic) profileFields.profilePic = req.body.profilePic;

    //Locate the user profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create
        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            return res.status(400).json(errors);
          }
          //Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
          new Profile(profileFields).save()
          .then(profiel => res.json(profile));
        });
      }
    });
  }
);

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});


// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @route   Profile api/profile/follow/:id
// @desc    follow user
// @access  Private
router.post(
  '/follow/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Profile.findOne({user: req.params.id}).then(profile => {
        if (
          profile.followers.filter(follower => follower.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyfollowed: 'You are already following this person' });
          }

        // Add user id to followers array of other user profile
        profile.followers.unshift({ user: req.user.id });

        // Add user id in following array of own profile
        Profile.findOne({user: req.user.id}).then(profile => {
          profile.following.unshift({ user: req.params.id })
          profile.save()
        });

        profile.save().then(profile => res.json(profile));

      })
      
      .catch(err => res.status(404).json({ profilenotfound: 'No profile found' }));
    });
  }
);


// @route   Profile api/profile/unfollow/:id
// @desc    unfollow user
// @access  Private
router.post(
  '/unfollow/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Profile.findOne({user: req.params.id})
        .then(profile => {
          if (
            profile.followers.filter(follower => follower.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notfollowed: 'You have not yet followed this person' });
          }

          // Get remove index
          const removeIndex = profile.followers
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice out of array
          profile.followers.splice(removeIndex, 1);


          // Remove other person user_id in following array of own profile
          Profile.findOne({user: req.user.id}).then(profile => {
            const removeIndex = profile.following
            .map(item => item.user.toString())
            .indexOf(req.params.id);

            // Remove other user id from own following array
            profile.following.splice(removeIndex, 1);
            
            // Save
            profile.save()
          });


          // Save
          profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


module.exports = router;