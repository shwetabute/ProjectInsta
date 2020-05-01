import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import { getPosts } from '../../actions/postActions';

class SavedPost extends Component {

componentDidMount() {
  this.props.getPosts();
  // this.props.getCurrentProfile();
}


existUser(savePost) {
const { auth } = this.props;
console.log(savePost);
if (savePost.filter(savePost => savePost.user === auth.user.id).length > 0) {
    return true;
  } else {
    return false;
  }
};


render() {
  const { posts } = this.props;
  console.log("posts");
  return posts.map(post => <PostItem key={post._id} post={post} />)
    // return posts.map(post => 
    //   {this.existUser(post.savePost) ? (<PostItem key={post._id} post={post} />) : null}
    // )
  }
}


SavedPost.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(SavedPost);
//export default SavedPost;