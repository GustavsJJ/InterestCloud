import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Jumbotron,
  Label,
  Media,
} from "reactstrap";
import { IAuth, ICategory } from "../types/interfaces";
import ErrorView from "./tool/ErrorView";
import Loading from "./tool/Loading";

interface propTypes {
  auth: IAuth;
  categories: ICategory[];
}

export class NewPost extends Component<propTypes> {
  state = {
    title: "",
    text: "",
    imageId: "",
  };

  constructor(props: propTypes) {
    super(props);
    this.onImageChange = this.onImageChange.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (e: any) => {
    e.preventDefault();
  };

  uploadImage(file: any) {
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/api/images", formData, config)
      .then((res) => {
        alert("The file is successfully uploaded");
        this.setState({ imageId: res.data.file.id });
      })
      .catch((error) => {});
  }

  deleteImage(id: String) {
    axios
      .delete(`/api/images/${id}`)
      .then((res) => alert("The file is successfully deleted"))
      .catch((err) => alert(err));
  }

  onImageChange(e: any) {
    if (!this.state.imageId) this.uploadImage(e.target.files[0]);
    else {
      this.deleteImage(this.state.imageId);
      this.uploadImage(e.target.files[0]);
    }
  }

  onChange(e: any) {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { user, isAuthenticated, isLoading } = this.props.auth;
    return (
      <Container className="post-container mt-5">
        {!isLoading && !isAuthenticated ? (
          ErrorView("401", "Unauthorized")
        ) : this.props.auth.isLoading ? (
          <Loading />
        ) : (
          <div className="post-box">
            <Jumbotron style={{ backgroundColor: "white" }}>
              <Media className="post">
                <Media body style={{ fontSize: "1rem" }}>
                  <Media heading>New Post</Media>
                  <hr />
                  <Form name="image" encType="multipart/form-data">
                    <Label for="exampleFile">Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={this.onImageChange}
                    />
                    <FormText color="muted">
                      This is some placeholder block-level help text for the
                      above input. It's a bit lighter and easily wraps to a new
                      line.
                    </FormText>
                  </Form>
                  <Form onSubmit={this.onSubmit}>
                    <Label for="exampleFile">Title</Label>
                    <Input
                      name="title"
                      value={this.state.title}
                      type="text"
                      onChange={this.onChange}
                    />
                    <Label for="exampleFile">Text</Label>
                    <Input
                      name="text"
                      value={this.state.text}
                      type="text"
                      onChange={this.onChange}
                    />

                    <FormGroup className="mt-2" check>
                      <Label check>
                        <Input
                          name="category"
                          type="checkbox"
                          onChange={this.onChange}
                        />{" "}
                        Check me out
                      </Label>
                      <Label check>
                        <Input
                          name="asd"
                          type="checkbox"
                          onChange={this.onChange}
                        />{" "}
                        asd
                      </Label>
                    </FormGroup>
                    <Button
                      type="submit"
                      className="mt-3"
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
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  categories: state.category.categories,
});

export default connect(mapStateToProps, {})(NewPost);
