const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // data.text = !isEmpty(data.text) ? data.text : "";
  // if (!Validator.isLength(data.text, { max: 100 })) {
  //   errors.text = "Post must be between 1 and 100 characters";
  // }

  // if (Validator.isEmpty(data.text)) {
  //   errors.text = "Text field is required";
  // }

  data.postimage = !isEmpty(data.postimage) ? data.postimage : "";
  if (Validator.isEmpty(data.postimage)) {
    errors.postimage = "Please provide a image for the post ";
  }
 
  
 

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
