import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import Profile from './Profile';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
  
    return (<div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-info text-white mb-3 profileCard">
        <div className="row">
          <div className="col-4 col-md-3 m-auto">
        {profile &&profile.user &&( <img
              className="rounded-circle"
              src= {profile?.profilePic? profile.profilePic : profile.user.avatar}
              height="150px" width="150px"
              alt=""
            />)}
          </div>
        </div>
        <div className="text-center">
          {profile && profile.user && (<h1 className="display-4 text-center " style={{ textTransform: "capitalize" }}>{profile.user.name}</h1>)}
          <p className="lead text-center" style={{textTransform: "capitalize"}}>
            {profile && profile.gender}{' '}
         
          </p>
          {/* <i class="fas fa-map-marker-alt" style={{color:"white"}}></i> {isEmpty(profile.location) ? null : <p style={{textTransform: "capitalize"}}>{profile.location}</p>}
           */}
          <div className="col-4 col-md-3 m-auto">
            <div className="float-left" >
              
              <p> <h4>10</h4> Followers</p>
            </div>
            <div className="float-right" >
              
              <p> <h4>20</h4> Following</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default ProfileHeader;