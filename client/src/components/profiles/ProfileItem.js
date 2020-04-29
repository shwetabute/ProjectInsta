import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    // console.log("This is from ProfileItem=",JSON.stringify(profile.profilePic))
    return (
      <div className="card card-body bg-light mb-3 ">
        <div className="row">
          <div className="col-md-12" >
           
          <div className="float-left">
            <img src={profile.profilePic?profile.profilePic: profile.user?.avatar }
              alt="" className="rounded-circle float-left" style={{height:"7vw", marginBottom:"-20px", marginRight:"15px"}} 
              />
              </div>
              <div className="float-left ">
          <h3 className= "profileName" >{profile.user?.name} </h3>
          
              <p>
              {isEmpty(profile.location) ? null : (
                <span className="float-left location"> <i class="fas fa-map-marker-alt"></i> {profile.location}</span>
              )}
            </p>
            </div>
          </div>
          <div className= "col-md-12">
          <div className="float-right "  >
            
            
            
            <Link  className="btn btn-info " style={{marginTop:"-100px", paddingLeft:"40px",  paddingRight:"40px"}}>
            <i class="fas fa-user-friends"style={{color:"white"}}></i> Follow      
            </Link>

            <div  >
            <Link to={`/profile/${profile.handle}`} className="btn btn-info " style={{marginTop:"-30px"}}>
            <i class="far fa-eye" style={{color:"white"}}></i> View Profile
            </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
