const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

 

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  // data.profilepic = !isEmpty(data.profilepic) ? data.profilepic : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 20 })) {
    errors.handle = "Handle needs to between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (!isEmpty(data.phonenumber)) {
    if (data.phonenumber.length !== 10) {
      // console.log("no="+data.phonenumber.length)
      errors.phonenumber = "Phone Number needs to be of 10 digits";
    }

    if (isNaN(data.phonenumber)) {
      errors.phonenumber = "Phone Number is invalid";
    }
  }

  if (!isEmpty(data.location)) {
    
    const filteredLocation = data.location.replace(/[^a-zA-Z .,]/g, "");
    if (filteredLocation !== data.location) {
      errors.location = "Enter valid location";
    }
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
