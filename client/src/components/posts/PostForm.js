import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import { getCurrentProfile } from '../../actions/profileActions';
import TextFieldGroup from "../common/TextFieldGroup";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      postimage: "",
      errors: {},
      
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { profilePic } = this.props.profile;

    // console.log("Props.profile info ",JSON.stringify(this.props.profile.profile.profilePic));
    // console.log(JSON.stringify(this.props));
    const newPost = {
      text: this.state.text,
      postimage: this.state.postimage,
      name: user.name,
      avatar: user.avatar,
      profilePic: this.props.profile.profile.profilePic,
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });

    this.setState({ postimage: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //upload img code
  serializeAsBase64 = (file) => {
    if (file === null) {
      return Promise.reject("getBase64: empty file specified");
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (
          reader.result &&
          typeof reader.result === "string" &&
          reader.result.startsWith("data:image")
        ) {
          resolve(reader.result);
        } else {
          reject("Not supported file format. Please select an image.");
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  UploadImage = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const picture = event.target.files[0];
      if (picture) {
        try {
          const postimage = await this.serializeAsBase64(picture);
          if (postimage.length > 25 * 1024) {
            this.setState({
              errors: { postimage: "Please provide an image within 25 kb" },
            });
            return;
          }
          this.setState({
            postimage: postimage,
          });
        } catch (err) {
          this.setState({ errors: { postimage: "Failed to parse image" } });
        }
      }
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3 col-md-5 float-right ">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body posting">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                {this.state.postimage && (
                  <img
                    src={this.state.postimage}
                    height="100px"
                    width="250px"
                  />
                )}

                <TextFieldGroup
                  type="file"
                  placeholder="Upload an image"
                  name="postimage"
                  onChange={this.UploadImage}
                  error={errors.postimage}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
});

export default connect(mapStateToProps, { addPost, getCurrentProfile })(PostForm);
