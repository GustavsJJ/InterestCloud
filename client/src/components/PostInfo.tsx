import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPostById,
  likePost,
  deletePost,
} from "../store/actions/postActions";
import { IAuth, ICategory, IComment, IPost } from "../types/interfaces";
import { withRouter } from "react-router";
import Loading from "./tool/Loading";
import {
  Alert,
  Badge,
  Button,
  Container,
  Form,
  FormText,
  Input,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";
import "./PostInfo.css";
import ErrorView from "./tool/ErrorView";
import { getComments, addComment } from "../store/actions/commentActions";

interface propTypes {
  auth: IAuth;
  post: IPost;
  postLoading: boolean;
  categories: ICategory[];
  comments: IComment[];
  match: any;
  getPostById: Function;
  getComments: Function;
  addComment: Function;
  likePost: Function;
  deletePost: Function;
}

export class PostInfo extends Component<propTypes> {
  state = {
    comment: "",
    message: "",
    alert: false,
    alertColor: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPostById(id);
    this.props.getComments(id);
  }

  onLike = () => {
    this.props.likePost(this.props.post._id);
  };

  onDelete = () => {
    this.props.deletePost(this.props.post._id);
  };

  onChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e: any) => {
    e.preventDefault();

    const comment = this.state.comment;
    this.props.addComment(
      this.props.match.params.id,
      comment,
      this.onOpenAlert
    );
  };

  onOpenAlert = (msg: string, isError: boolean) => {
    this.setState({
      message: msg,
      alert: true,
      alertColor: isError ? "danger" : "success",
      comment: isError ? this.state.comment : "",
    });
  };

  onCloseAlert = () => {
    this.setState({
      message: "",
      alert: false,
    });
  };

  render() {
    const {
      title,
      description,
      imageId,
      author,
      date,
      categoryIds,
      liked,
    } = this.props.post;
    const dateInstance = new Date(date);
    const formattedDate = `${dateInstance.getDate()}.${
      dateInstance.getMonth() + 1
    }.${dateInstance.getFullYear()}`;
    return (
      <Container className="post-container mt-5">
        {this.props.postLoading ? (
          <div>
            <Loading />
          </div>
        ) : title ? (
          <div style={{ fontSize: "1rem" }}>
            <div>
              <Jumbotron style={{ backgroundColor: "white" }}>
                <Media className="post-box" style={{ width: "100%" }}>
                  <Media className="post-image" style={{ float: "left" }}>
                    {imageId && (
                      <Media
                        object
                        src={`/api/images/render/${imageId}`}
                        style={{ maxWidth: "300px", maxHeight: "300px" }}
                        alt={`Image not found`}
                      />
                    )}
                  </Media>

                  <Media className="post-content mx-3" body>
                    <Media heading>{title}</Media>
                    {author && (
                      <p className="text-muted mb-0">{`Author: ${author}`}</p>
                    )}
                    {date && (
                      <p className="text-muted">{`Date: ${formattedDate}`}</p>
                    )}
                    <p
                      className="post-text"
                      style={{ whiteSpace: "break-spaces" }}
                    >
                      {description}
                    </p>
                  </Media>
                  <div>
                    <div className="categories-floater pt-3 pr-3">
                      <div />
                      <div className="categories">
                        {categoryIds?.length
                          ? categoryIds.map((categoryId) => {
                              const category = this.props.categories.find(
                                (cat) => cat._id === categoryId
                              );
                              return (
                                <h3>
                                  <Badge
                                    color={category?.color}
                                    href={`/category/${category?.name}`}
                                  >
                                    {category?.name}
                                  </Badge>
                                </h3>
                              );
                            })
                          : null}
                      </div>
                    </div>
                    {this.props.auth.isAuthenticated && (
                      <div className="px-3">
                        <Button
                          className="like-button"
                          block
                          color="info mt-3"
                          outline={liked}
                          onClick={this.onLike}
                        >
                          <b>{liked ? "Liked" : "Like"}</b>
                        </Button>
                      </div>
                    )}
                    {this.props.auth.isAuthenticated &&
                      this.props.auth.user.role === "admin" && (
                        <div className="px-3 mt-3">
                          <Button
                            className="delete-button"
                            block
                            color="danger"
                            outline
                            onClick={this.onDelete}
                          >
                            <b>Delete Post</b>
                          </Button>
                        </div>
                      )}
                  </div>
                </Media>
              </Jumbotron>
            </div>
            <div className="comment-box">
              <Jumbotron className="p-5" style={{ backgroundColor: "white" }}>
                {this.props.auth.isAuthenticated && (
                  <div>
                    <Alert
                      color={this.state.alertColor}
                      isOpen={this.state.alert}
                      toggle={this.onCloseAlert}
                    >
                      {this.state.message}
                    </Alert>
                    <h4 className="ml-2">Post Comment:</h4>
                    <Form className="my-3">
                      <Input
                        type="textarea"
                        style={{
                          minHeight: "150px",
                          justifyContent: "flex-start",
                          wordBreak: "break-word",
                        }}
                        onChange={this.onChange}
                        value={this.state.comment}
                        name="comment"
                      />
                      <FormText color="muted">
                        Comment cannot contain more than 250 symbols
                      </FormText>
                      <Button
                        className="mt-3"
                        color="info"
                        onClick={this.onSubmit}
                      >
                        <b>Submit</b>
                      </Button>
                    </Form>
                    <hr />
                  </div>
                )}

                <h4 className="mb-3 ml-2">Comments: </h4>
                <ListGroup>
                  {this.props.comments.length ? (
                    this.props.comments.map((comment) => (
                      <ListGroupItem>
                        <Media body>
                          <Media heading style={{ fontSize: "1rem" }}>
                            {`${comment.authorId?.name} ${
                              comment.authorId?.surname
                                ? comment.authorId?.surname
                                : ""
                            }`}
                          </Media>
                          {comment.text}
                        </Media>
                      </ListGroupItem>
                    ))
                  ) : (
                    <ListGroupItem style={{ justifyContent: "space-around" }}>
                      <h5 className="m-3">No comments yet...</h5>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Jumbotron>
            </div>
          </div>
        ) : (
          ErrorView("404", "Post Not Found")
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  post: state.post.post,
  postLoading: state.post.postLoading,
  categories: state.category.categories,
  comments: state.comment.comments,
});

export default withRouter(
  connect(mapStateToProps, {
    addComment,
    getComments,
    getPostById,
    likePost,
    deletePost,
  })(PostInfo)
);
