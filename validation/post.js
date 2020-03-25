const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // data.text = !isEmpty(data.text) ? data.text : "";
  data.postimage = !isEmpty(data.postimage) ? data.postimage : "";

  // if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
  //   errors.text = "Post must be between 10 and 300 characters";
  // }

  // if (Validator.isEmpty(data.text)) {
  //   errors.text = "Text field is required";
  // }
  if (Validator.isEmpty(data.postimage)) {
    errors.postimage = "Please provide a image for the post ";
  }
  
  if (!Validator.isURL(data.postimage)) {
    errors.postimage = "Not a valid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
