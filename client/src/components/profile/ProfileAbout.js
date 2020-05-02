import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user?.name.trim().split(' ')[0];

       return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            
            <h4 className="text-center text-info insta_color" style={{textTransform: "capitalize"}} >{firstName}'s Bio and Website</h4>
            <hr />
           
            <p className="lead" >
            
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            
                 <p className="profileBio" >
                {isEmpty(profile.website) ? null : (
                  <a
                    className=""
                    href={profile.website}
                    target="_blank"
                  >
                     <i className="fas fa-globe fa-2x" /> {profile.website}
                  </a>
                )}
                  </p>
              </div>
          </div>
        </div>
  
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;