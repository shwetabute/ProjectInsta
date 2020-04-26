import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike, savePost, unsavePost } from '../../actions/postActions';

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
    const { post, auth, showActions, profile } = this.props;

    console.log(JSON.stringify(profile));
    return (
      <div className="card mb-3 col-md-7">
        {/* <div className="col-md-2"> */}
          <div class="card-body">
          
            <Link to="/profile" >
              <img
                className="rounded-circle d-none d-sm-block profileImg"
                src={profile.profilePic ? profile.profilePic : post.avatar}
                alt=""
              />
            </Link>
            <p className="text-left name">{post.name}</p>
            
            
            
              
          </div>
          <div className="postimg"> 
          <img src={post.postimage} class="card-img-top postImg"></img>
          </div>
            {showActions ? (
              
              <span >
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes),
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>


                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>


                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}


                {/* savePost */}
                {this.findSavePost(post.savePost) ? (
                  <button
                  onClick={this.unSavePostClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                  >
                  <i className="fas fa-bookmark saveButton"/>
                  </button>  )    
                  :( <button
                      onClick={this.savePostClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-light mr-1"
                    >
                    <i className='far fa-bookmark'/>
                    </button> )
                }
              </span>
            ) : null}
            <div> 
            <p class="card-text">{post.text}</p>
            </div>
          </div>
        // </div>
      // </div>
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
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike, savePost, unsavePost })(
  PostItem
);
