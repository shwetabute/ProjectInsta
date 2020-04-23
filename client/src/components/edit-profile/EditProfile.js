import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
// import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      bio: '',
      gender: '',
      phonenumber:'',
      // status: '',
      // skills: '',
      // githubusername: '',
      
      // twitter: '',
      // facebook: '',
      // linkedin: '',
      // youtube: '',
      // instagram: '',
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

      // // Bring skills array back to CSV
      // const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
      profile.phonenumber = !isEmpty(profile.phonenumber) ? profile.phonenumber : '';

      // profile.githubusername = !isEmpty(profile.githubusername)
      //   ? profile.githubusername
      //   : '';
      // profile.social = !isEmpty(profile.social) ? profile.social : {};
      // profile.twitter = !isEmpty(profile.social.twitter)
      //   ? profile.social.twitter
      //   : '';
      // profile.facebook = !isEmpty(profile.social.facebook)
      //   ? profile.social.facebook
      //   : '';
      // profile.linkedin = !isEmpty(profile.social.linkedin)
      //   ? profile.social.linkedin
      //   : '';
      // profile.youtube = !isEmpty(profile.social.youtube)
      //   ? profile.social.youtube
      //   : '';
      // profile.instagram = !isEmpty(profile.social.instagram)
      //   ? profile.social.instagram
      //   : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        website: profile.website,
        location: profile.location,
        bio: profile.bio,
        gender: profile.gender,
        phonenumber:profile.phonenumber

        // company: profile.company,
        // status: profile.status,
        // skills: skillsCSV,
        // githubusername: profile.githubusername,
        
        // twitter: profile.twitter,
        // facebook: profile.facebook,
        // linkedin: profile.linkedin,
        // youtube: profile.youtube,
        // instagram: profile.instagram
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
      gender:this.state.gender

      // status: this.state.status,
      // skills: this.state.skills,
      // githubusername: this.state.githubusername,
      // twitter: this.state.twitter,
      // facebook: this.state.facebook,
      // linkedin: this.state.linkedin,
      // youtube: this.state.youtube,
      // instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors} = this.state;

   
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                               
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  error={errors.gender}
                />

                <TextFieldGroup
                  placeholder="Phone Number"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.onChange}
                  error={errors.phonenumber}
                  info="Would you like to add Phone No"
                />
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