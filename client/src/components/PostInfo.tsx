import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPostById,
  likePost,
  deletePost,
} from "../store/actions/postActions";
import store from "../store/store";
import { IAuth, ICategory, IPost } from "../types/interfaces";
import { withRouter } from "react-router";
import Loading from "./tool/Loading";
import {
  Badge,
  Button,
  Container,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";
import "./PostInfo.css";
import ErrorView from "./tool/ErrorView";

interface propTypes {
  auth: IAuth;
  post: IPost;
  postLoading: boolean;
  categories: ICategory[];
  match: any;
}

export class PostInfo extends Component<propTypes> {
  componentDidMount() {
    const id = this.props.match.params.id;
    store.dispatch(getPostById(id));
  }

  onLike = () => {
    store.dispatch(likePost(this.props.post._id));
  };

  onDelete = () => {
    store.dispatch(deletePost(this.props.post._id));
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
                        alt="Generic placeholder image"
                        style={{ width: "300px", height: "300px" }}
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
              <Jumbotron style={{ backgroundColor: "white" }}>
                <h4 className="mb-3 ml-2">Comments: </h4>

                <ListGroup>
                  <ListGroupItem>
                    <Media body>
                      <Media heading style={{ fontSize: "1rem" }}>
                        Commenter_1
                      </Media>
                      Vestibulum placerat varius leo, quis tincidunt ipsum
                      efficitur vel. Nullam bibendum porta metus, in pretium
                      diam ullamcorper id. Sed non urna ut lectus hendrerit
                      feugiat a non massa. Donec nisi magna, viverra a tincidunt
                      eu, gravida sit amet sapien. Nunc lacinia ipsum vel
                      sollicitudin elementum. Nulla facilisi. Vivamus fringilla
                      eros turpis, ut porttitor tortor euismod ac. Donec neque
                      dolor, volutpat ut nunc eget, gravida faucibus dolor.
                      Aliquam finibus, sem vel posuere pellentesque, est dolor
                      ullamcorper ipsum, vitae vestibulum mi tortor in libero.
                      Orci varius natoque penatibus et magnis dis parturient
                      montes, nascetur ridiculus mus. Nam dolor sem, tincidunt
                      eu consequat eu, mattis sit amet neque.
                    </Media>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Media body>
                      <Media heading style={{ fontSize: "1rem" }}>
                        Commenter_2
                      </Media>
                      Aenean imperdiet risus sapien, nec commodo nisi porttitor
                      eget. Integer porta imperdiet tortor ac porttitor. Etiam
                      dignissim fringilla commodo. Quisque malesuada volutpat
                      fringilla. Maecenas at dui sed ipsum accumsan commodo.
                      Aliquam sem enim, laoreet id bibendum ut, tempor nec
                      justo. Morbi viverra vulputate tellus.
                    </Media>
                  </ListGroupItem>
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
});

export default withRouter(connect(mapStateToProps, {})(PostInfo));
