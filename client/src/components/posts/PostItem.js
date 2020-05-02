import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getProfiles } from '../../actions/profileActions';

import { deletePost, addLike, removeLike, savePost, unsavePost, followUser } from '../../actions/postActions';

class PostItem extends Component {

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  savePostClick(id) {
    this.props.savePost(id);
  }

  unSavePostClick(id) {
    this.props.unsavePost(id);
  }

  componentDidMount() {
    this.props.getProfiles();
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  //save unsave post if logic
  findSavePost(savePost) {
    const { auth } = this.props;
    if (savePost.filter(savePost => savePost.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }


  render() {

    const { post, auth, showActions } = this.props;
    const { profiles } = this.props.profile;

    console.log(profiles)
    var profile = undefined;
    for(var i = 0; i < profiles?.length; i++) {
      if (profiles[i].user?._id === post.user) {
        profile = profiles[i];
        break;
      }
    }
 

    return (
      <div className="card mb-3 col-md-7">
        <div class="card-body">
            <Link to={`/profile/${profile?.handle}`}>
                        
                <img
                  className="rounded-circle d-none d-sm-block profileImg"
                  src={post.profilePic?post.profilePic:post.avatar}
                  alt=""
                />
             
           
                  </Link>
            <p className="text-left name">{post.name}</p>
            
            <div className="float-right">
              {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn1 btn-light mr-1 float-left delete"
                   >  <i className="fas fa-times float-left"  /> 
                  </button>
                ) : null
              }
            </div>  
          </div>
          <hr />
          <div className="postimg"> 
          <img src={post.postimage} class="card-img-top postImg"></img>
          </div>
          
            {showActions ? (
              
              <span className="actions">
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn1 btn-light mr-1 float-left"
                >
                  <i
                    className={classnames("fas fa-thumbs-up float-left", {
                      "text-info": this.findUserLike(post.likes),
                    })}
                  />
                  <span className="badge badge-light float-left" style={{backgroundColor:'transparent'}}>{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn1 btn-light mr-1 float-left"
                >
                  <i className="text-secondary fas fa-thumbs-down float-left" />
                </button>


                <Link to={`/post/${post._id}`} className="btn1 btn-info mr-1 float-left">
                <i class="far fa-comment float-left"></i>
                </Link>

                {/* savePost */}
                {this.findSavePost(post.savePost) ? (
                  <button
                  onClick={this.unSavePostClick.bind(this, post._id)}
                  type="button"
                  className="btn1 btn-light mr-1 float-right"
                  >
                  <i className="fas fa-bookmark saveButton float-right"/>
                  </button>  )    
                  :( <button
                      onClick={this.savePostClick.bind(this, post._id)}
                      type="button"
                      className="btn1 btn-light mr-1 float-right "
                    >
                    <i className='far fa-bookmark float-right'/>
                    </button> )
                }
            
              </span>
            ) : null}
            <hr />
            <div> 
            <p className="card-text float-left">{post.text}</p>
            </div>
            <br/>
            
            
          </div>
     
      
    );
  }
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  savePost: PropTypes.func.isRequired,
  unsavePost: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
// console.log(JSON.stringify().post)

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike, savePost, unsavePost, followUser, getProfiles })(
  PostItem
);
