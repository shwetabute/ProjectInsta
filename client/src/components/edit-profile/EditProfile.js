import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      company: '',
      website: '',
      location: '',
      bio: '',
      gender: '',
      phonenumber: '',
      profilePic: "",
     
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
      profile.phonenumber = !isEmpty(profile.phonenumber) ? profile.phonenumber : '';
      profile.profilePic=!isEmpty(profile.profilePic) ? profile.profilePic : '';

      

      // Set component fields state
      this.setState({
        handle: profile.handle,
        website: profile.website,
        location: profile.location,
        bio: profile.bio,
        gender: profile.gender,
        phonenumber: profile.phonenumber,
        profilePic:profile.profilePic

       
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      phonenumber: this.state.phonenumber,
      gender: this.state.gender,
      profilePic:this.state.profilePic

      
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
   //upload img code
  serializeAsBase64 = (file) => {
    if (file === null) {
      return Promise.reject("getBase64: empty file specified");
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (
          reader.result &&
          typeof reader.result === "string" &&
          reader.result.startsWith("data:image")
        ) {
          resolve(reader.result);
        } else {
          reject("Not supported file format. Please select an image.");
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  UploadImage = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const picture = event.target.files[0];
      if (picture) {
        try {
          const profilePic = await this.serializeAsBase64(picture);
          // onImageChange && onImageChange(profilePic)
          if (profilePic .length > 25 * 1024) {
            this.setState({ errors: { "profilePic ": "Please provide an image within 25 kb" }});
            return;
          }
          this.setState({
            profilePic: profilePic,
          });
        } catch (err) {
          this.setState({ errors: { "profilePic ": "Failed to parse the image" }});
        }
      }
    }
  };

  render() {
    const { errors} = this.state;

   
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              
              <h5 className="test-right">Edit Profile</h5>
             
              {this.state.profilePic && (
                  <img  className="rounded-circle profilePic"
                   src={this.state.profilePic} 
                   height="100px" width="100px"
                   />
                )}
          
              <form onSubmit={this.onSubmit}>
              <input
                  type="file"
                  placeholder="Upload an image"
                  name="profilePic"
                  onChange={this.UploadImage}
                  error={errors.profilePic}
                />
                <TextFieldGroup
                  placeholder="* Username"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Please provide a unique username for your profile"
                />
                 <TextFieldGroup
                  placeholder="Phone Number"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.onChange}
                  error={errors.phonenumber}
                  info="Please provide a valid Phone Number"
                />              
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  // info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Bellevue, WA)"
                />
                
                <select className="custom-select form-group form-text createpost" style={{color:"rgb(58, 56, 56)"}}>
                  <option selected >Gender...</option>
                  <option type="radio" value="Male" name="gender"
                                  checked={this.state.gender === 'Male'} 
                                  onChange={this.onChange} >
                  Male
                    </option>
                
                    <option type="radio" value="Female" name="gender"
                                  checked={this.state.gender === 'Female'} 
                                  onChange={this.onChange} >
                    Female
                  </option>
                  
                    <option type="radio" value="Custom" name="gender"
                                  checked={this.state.gender === 'Custom'} 
                                  onChange={this.onChange} >
                    Custom
                  </option>
                  
                    <option type="radio" value="Prefer Not to Say" name="gender"
                                  checked={this.state.gender === 'Prefer Not to Say'} 
                                  onChange={this.onChange} >
                    Prefer Not to Say
                  </option>
                </select>  
              
               
                
 
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);