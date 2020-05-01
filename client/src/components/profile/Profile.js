import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";
import { getPosts } from "../../actions/postActions";
import { json } from "body-parser";

class Profile extends Component {
  componentDidMount() {
    this.props.getPosts();
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { post } = this.props;
    let profileContent;

    // console.log("this is post info from Profile", JSON.stringify(post.posts[0]?._id));
    // console.log(
    //   "This is saveposts from profile.js",
    //   JSON.stringify(profile?.savePost)
    // );

    // displaying saved posts
    const newSavedPost = post?.posts?.filter(
      (p) =>
        profile?.savePost?.filter((savedItem) => savedItem.postId === p._id)
          .length > 0
    );

    const SavedPosts =
      newSavedPost &&
      newSavedPost.map((item, index) => {
        return (
          <div>
            <img
              src={item.postimage}
              key={index}
              height="150px"
              width="150px"
            />
            <span>{item.text}</span>
          </div>
        );
      });

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="col-md-12 ">
          {/* <div className="row">
          
          </div> */}
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <h3>Saved posts</h3>
          {SavedPosts}

          <Link to="/profiles" className="btn btn-light mb-3 float-left">
            Back To Profiles
          </Link>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { getProfileByHandle, getPosts })(
  Profile
);
