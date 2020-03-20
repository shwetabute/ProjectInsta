const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  
  if (!Validator.isLength(data.handle, { min: 2, max: 20 })) {
    errors.handle = 'Handle needs to between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }  


  if (!isEmpty(data.phonenumber)) {
    if (!Validator.isLength(data.phonenumber, { is: 10})){
      errors.phonenumber = 'Phone Number needs to be of 10 digits';
    }

    if (!Validator.isInteger(data.phonenumber)) {
      errors.phonenumber = 'Phone Number is invalid';
    }
  }


  if (!isEmpty(data.email)) {
    if(!Validator.isEmail(data.email))
    {
      errors.email = 'Email is invalid';
    }
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
