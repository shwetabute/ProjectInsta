const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");
// Profile model
const Profile = require("../../models/Profile");

// Validation 
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    //console.log("printing",JSON.stringify(req.body.profile))
   // console.log("printing", JSON.stringify(req.profile.id))
    const newPost = new Post({
      postimage: req.body.postimage,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
     // profile:req.profile.id,
      profilePic:req.body.profilePic
      // req.body.profilePic? profilePic = req.body.profilePic 
    });
    //console.log("profilePic" + req.body.profilePic);
    newPost.save().then(post => res.json(post));
  }
);

// @route   GET api/posts
// @desc    Get posts List all the post
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id after clicking a perticular post open up in new page
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);
// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
          profilePic:req.body.profilePic
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
    })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
});


// @route   POST api/posts/savepost/:postId
// @desc    Save post
// @access  Private

router.post("/savepost/:postId",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      // Save PostId in Profile.savePost array 
      Profile.findOne({ user: req.user.id }).then(profile => {
          if (
            profile.savePost.filter(savePost => savePost.postId.toString() === req.params.postId)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadySaved : 'This post is already saved' });
          }

          // Add post id to savePost array in Profile Collection
          profile.savePost.unshift({ postId : req.params.postId });
          
        // Code to add UserId in Post.savePost array 
        Post.findById(req.params.postId)
        .then(post => { 
          
          // Add user id to savePost array
          post.savePost.unshift({ user: req.user.id });
          post.save({"_id" : post.id})
        })

        profile.save({"_id" : profile.id}).then(profile => res.json(profile));
      })
    .catch(err => res.status(404).json({ postnotfound: "No profile exists" }));
});



// @route   POST api/posts/unsavepost/:postId
// @desc    unsave post
// @access  Private
router.post('/unsavepost/:postId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
          if (
            profile.savePost.filter(savePost => savePost.postId.toString() === req.params.id)
              .length = 0
          ) {
            return res
              .status(400)
              .json({ notSaved : 'This post is not yet saved' });
          }

          // Remove post id from savePost array
          // Get remove index
          const removeIndex = profile.savePost
            .map(item => item.postId.toString())
            .indexOf(req.params.postId);

          // Splice out of array
          profile.savePost.splice(removeIndex, 1);

          
          // Unsave the user_Id from Post.savePost array
          Post.findById(req.params.postId)
          .then(post => {
  
            // Get remove index
            const removeIndex = post.savePost.map(item => item.user.toString()).indexOf(req.user.id);
  
            // Splice User Id out of Post.savePost array
            post.savePost.splice(removeIndex, 1);
  
            // Save
            post.save({"_id" : post.id})
          })

          profile.save({"_id" : profile.id}).then(profile => res.json(profile));
    });
});


module.exports = router;
