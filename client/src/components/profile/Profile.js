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
import { Card,CardDeck, CardGroup } from "react-bootstrap";
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

    console.log("this is post info from Profile", JSON.stringify(post.posts));
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
       
          <CardGroup className="thumbnail">
          <Card >
          <Card.Title className="titleSP" style={{textTransform: "capitalize"}}> <i class="far fa-user"></i> {item.name}</Card.Title>
           
           <Card.Img  className="imageSP" variant="top" src={item.postimage}  />
           
        
        </Card>
        </CardGroup>

         
        );
      });

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="col-md-12 ">
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
         <div className=" col-md-12 centerdiv card card-body bg-light mb-3">
          <h4 className="insta_color">Saved Posts</h4>
          <hr/>
          <CardGroup>{SavedPosts}</CardGroup>
          </div>
         
        </div>
      );
    }

    return (
      <>
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">{profileContent}</div>
            </div>
          </div>
        </div>
       
      </>
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
