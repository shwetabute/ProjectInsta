import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import Profile from './Profile';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    if (profile && (profile.gender === "Prefer Not to Say" || profile.gender === "Custom")){
      profile.gender = " ";
    }
  
    return (<div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-info text-white mb-3 profileCard">
        <div className="row">
          <div className="col-6 offset-3">
        {profile &&profile.user &&( <img
              className="rounded-circle "
              src= {profile?.profilePic? profile.profilePic : profile.user.avatar}
              height="150px" width="150px"
              alt=""
            />)}
          </div>
        </div>
        <div className="col-6 offset-3">
          {profile && profile.user && (<h1 className="display-4 text-center " style={{ textTransform: "capitalize" }}>{profile.user.name}</h1>)}
          <p className="lead text-center" style={{textTransform: "capitalize"}}>
            {profile && profile.gender}{' '}
         
          </p>
             <p style={{textTransform: "capitalize"}}>{(profile && profile.location)}</p>
          
        </div>
        <div className="col-6 offset-3">
            <div className="float-left" >
              
              <p> <h4>10</h4> Followers</p>
            </div>
            <div className="float-right" >
              
              <div className="col-4 col-md-3 m-auto">
                <div className="float-left" >
                  
                  <p> <h4>{ profile.followers.length }</h4> Followers </p>
                </div>
                <div className="float-right" >
                  
                  <p> <h4>{ profile.following.length }</h4> Following </p>
                </div>
              </div>
              
              {/* <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                              </p> */}
            </div>
          </div>
      </div>
    </div>
  </div>
    );
  }
}

export default ProfileHeader;