import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Jumbotron,
  Label,
  Media,
  Spinner,
} from "reactstrap";
import { IAuth, ICategory } from "../types/interfaces";
import ErrorView from "./tool/ErrorView";
import Loading from "./tool/Loading";
import { createPost } from "../store/actions/postActions";

interface propTypes {
  auth: IAuth;
  categories: ICategory[];
  createPost: Function;
}

interface stateTypes {
  alertVisibility: false;
  alertColor: string;
  alertMsg: string;
  title: string;
  text: string;
  imageId: string;
  categories: {
    [key: string]: any;
  };
  file: File;
  isLoading: boolean;
}

export class NewPost extends Component<propTypes> {
  state: Readonly<stateTypes> = {
    alertVisibility: false,
    alertColor: "",
    alertMsg: "",
    title: "",
    text: "",
    imageId: "",
    categories: {},
    file: new File([""], ""),
    isLoading: false,
  };

  constructor(props: propTypes) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
  }

  // saves all categories once thay are fetched
  componentDidUpdate(prevProps: propTypes) {
    if (prevProps.categories !== this.props.categories) {
      if (this.props.categories.length) {
        const categories: any = {};
        this.props.categories.map(
          (category) => (categories[category._id] = false)
        );
        this.setState({ categories });
      }
    }
  }

  // creates a post
  onSubmit = (e: any) => {
    e.preventDefault();
    if (!this.state.isLoading) {
      const { title, text, imageId, file } = this.state;
      const allCategories = this.state.categories;
      const categories = Object.keys(allCategories).filter(
        (key) => allCategories[key] === true
      );
      const newPost = {
        title,
        text,
        imageId,
        categories,
        file,
      };
      this.props.createPost(newPost, this.onSubmitError, this.onSubmitSuccess);
      this.setState({ isLoading: true });
    }
  };

  // clears all fields
  onSubmitSuccess = (msg: string) => {
    this.setState({
      alertColor: "success",
      alertVisibility: true,
      alertMsg: msg,
      title: "",
      text: "",
      imageId: "",
      categories: {},
      file: new File([""], ""),
      isLoading: false,
    });
  };

  // returns error message
  onSubmitError = (err: string) => {
    this.setState({
      alertColor: "danger",
      alertVisibility: true,
      alertMsg: err,
      isLoading: false,
    });
  };

  // changes file input value
  onImageChange(e: any) {
    if (e.target.files.length) {
      const file = new File([e.target.files[0]], e.target.files[0].name, {
        type: e.target.files[0].type,
      });
      this.setState({ file });
    } else {
      this.setState({ file: undefined });
    }
  }

  // changes text input value
  onChange(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // changes category input value
  onChangeCategory(e: any) {
    this.setState({
      categories: {
        ...this.state.categories,
        [e.target.name]: e.target.checked,
      },
    });
  }

  // closes alert
  onCloseAlert = () => {
    this.setState({ alertVisibility: false });
  };

  render() {
    const { isAuthenticated, isLoading } = this.props.auth;

    return (
      <Container className="post-container mt-5">
        {
          // if user is not being loaded and user is not authenticated
          !isLoading && !isAuthenticated ? (
            ErrorView("401", "Unauthorized")
          ) : // if user is being loaded
          this.props.auth.isLoading ? (
            <Loading />
          ) : (
            // if user is not being loaded and user is authenticated
            <div>
              <Jumbotron style={{ backgroundColor: "white" }}>
                <Media className="post">
                  <Media body style={{ fontSize: "1rem" }}>
                    <Media className="d-flex" heading>
                      New Post
                    </Media>
                    <hr />
                    <Form name="image" encType="multipart/form-data">
                      <Alert
                        color={this.state.alertColor}
                        isOpen={this.state.alertVisibility}
                        toggle={this.onCloseAlert}
                      >
                        {this.state.alertMsg}
                      </Alert>
                      <Label for="exampleFile">Image</Label>
                      <Input
                        id="post-image-upload"
                        type="file"
                        // accept="image/*"
                        style={{ overflow: "hidden" }}
                        onChange={this.onImageChange}
                      />
                      <FormText
                        color="muted"
                        style={{ whiteSpace: "break-spaces" }}
                      >
                        {
                          'File should be 1MB ".jpeg" or ".png" image file\nRecomended size: 300x300 px'
                        }
                      </FormText>
                    </Form>
                    <Form onSubmit={this.onSubmit}>
                      <Label className="mt-1">Title</Label>
                      <Input
                        name="title"
                        value={this.state.title}
                        type="text"
                        onChange={this.onChange}
                      />
                      <FormText color="muted">
                        Title cannot contain more than 50 symbols
                      </FormText>
                      <Label className="mt-1">Text</Label>
                      <Input
                        style={{
                          minHeight: "90px",
                          justifyContent: "flex-start",
                          wordBreak: "break-word",
                        }}
                        name="text"
                        value={this.state.text}
                        type="textarea"
                        onChange={this.onChange}
                      />
                      <FormText color="muted">
                        Text cannot contain more than 2000 symbols
                      </FormText>
                      <Label className="mt-1">Categories</Label>
                      <FormGroup className="mb-0 pl-1">
                        {this.props.categories.map((category) => (
                          <Label className="mx-3 mb-0">
                            <Input
                              checked={this.state.categories[category._id]}
                              name={category._id}
                              type="checkbox"
                              onChange={(e: any) => this.onChangeCategory(e)}
                            />
                            {category.name}
                          </Label>
                        ))}
                      </FormGroup>
                      <FormText color="muted">
                        Post must have one to three categories.
                      </FormText>
                      <div
                        className="mt-3"
                        style={{
                          textAlign: "center",
                          alignItems: "center",
                          visibility: this.state.isLoading
                            ? "visible"
                            : "hidden",
                        }}
                      >
                        <Spinner />
                      </div>
                      <Button
                        type="submit"
                        className="mt-3 submit"
                        color="dark"
                        onClick={(e: any) => this.onSubmit(e)}
                        block
                      >
                        Create a Post
                      </Button>
                    </Form>
                  </Media>
                </Media>
              </Jumbotron>
            </div>
          )
        }
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  categories: state.category.categories,
});

export default connect(mapStateToProps, { createPost })(NewPost);
