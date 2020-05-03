import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';
import { followUser, unfollowUser } from '../../actions/profileActions';

class ProfileItem extends Component {

  onFollowClick(id) {
    // console.log (id);
    this.props.followUser(id);
  }

  onUnfollowClick(id) {
    // console.log (id);
    this.props.unfollowUser(id);
  }

  //follow unfollow user-if logic
  findFollower(followers) {
    const { auth } = this.props;
    if (followers.filter((follower) => follower.user === auth.user.id).length > 0) {
      return false;
    } else {
      return true;
    }
  }



  render() {
    const { profile, auth } = this.props;
    return (
    <div>
    { profile.user?._id === auth.user.id ? null :
      <div className="card card-body bg-light mb-3 ">
        <div className="row">
          <div className="col-md-12" >
           
          <div className="float-left">
            <img src={profile.profilePic?profile.profilePic: profile.user?.avatar }
              alt="" className="rounded-circle float-left" style={{height:"90px",width:"90px", marginBottom:"-20px", marginRight:"15px"}} 
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
            <div className="float-right ">
            
                    
            {/* Follow_Unfollow user */}
            {/* {this.profile.user === auth.user.id ? null : */}
            {this.findFollower(profile.followers) ? (
            <button onClick= {this.onFollowClick.bind(this, profile.user?._id)} 
                    type="button"
                    className="btn btn-info " 
                    style={{marginTop:"-100px", paddingLeft:"43px",  paddingRight:"43px"}}>
            <i class="fas fa-user-friends"style={{color:"white"}}></i> Follow
            </button>)
            :(<button onClick= {this.onUnfollowClick.bind(this, profile.user?._id)} 
                    type="button"
                    className="btn btn-info " 
                    style={{marginTop:"-100px", paddingLeft:"31px",  paddingRight:"31px"}}>
            <i class="fas fa-user-friends"style={{color:"white"}}></i> Unfollow
            </button>
            )}

            <div>
              <Link to={`/profile/${profile.handle}`} className="btn btn-info " style={{marginTop:"-30px"}}>
              <i class="far fa-eye" style={{color:"white"}}></i> View Profile
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
    );
  }
}


// ProfileItem.defaultProps = {
//   showActions: true,
// };

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

// export default ProfileItem;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { followUser, unfollowUser })(ProfileItem);