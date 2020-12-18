import React, { Component } from "react";
import { Badge, Container, ListGroup, ListGroupItem, Media } from "reactstrap";
import { connect } from "react-redux";
import store from "../store/store";
import { getPosts } from "../store/actions/postActions";
import "./Posts.css";
import Loading from "./tool/Loading";
import { Link } from "react-router-dom";
import { ICategory, IPost } from "../types/interfaces";

interface propTypes {
  post: {
    posts: IPost[];
    post: IPost;
    postsLoading: boolean;
    postLoading: boolean;
  };
  categories: ICategory[];
  sortBy: string;
}

export class Posts extends Component<propTypes> {
  public static defaultProps = {
    sortBy: "",
  };

  componentDidMount() {
    store.dispatch(getPosts());
  }

  render() {
    return (
      <Container>
        {!this.props.post.postsLoading ? (
          <Container fluid className="posts-container mb-5">
            <ListGroup>
              {!this.props.post.postsLoading &&
              !this.props.post.posts.length ? (
                <ListGroupItem>
                  <h2>No post found</h2>
                </ListGroupItem>
              ) : this.props.post.posts.length ? (
                this.props.post.posts.map(
                  ({ _id, title, description, categoryIds, imageId }, i) => (
                    <ListGroupItem>
                      <Media className="post mt-2">
                        <Media>
                          <Link to={`/post/${_id}`}>
                            {imageId && (
                              <Media
                                object
                                className="post-image mb-1"
                                // src={`https://picsum.photos/400/300?random=${i}`}
                                src={`/api/images/render/${imageId}`}
                                alt="Generic placeholder image"
                              />
                            )}
                          </Link>
                        </Media>
                        <Media body>
                          <Media heading>
                            <Link to={`/post/${_id}`}>{title}</Link>
                          </Media>
                          <p
                            style={{
                              overflowX: "hidden",
                              fontSize: "1rem",
                              whiteSpace: "pre-wrap",
                              fontFamily: "inherit",
                              marginBottom: "0px",
                            }}
                          >
                            {description.length > 900
                              ? description.substring(0, 900) + "..."
                              : description}
                          </p>
                        </Media>
                      </Media>

                      <div
                        className="categories-floater"
                        style={{
                          clear: "both",
                          display: "flex",
                        }}
                      >
                        <div />
                        <div
                          style={{
                            display: "flex",
                            flex: "wrap",
                            flexWrap: "wrap",
                            gap: "5px",
                          }}
                        >
                          {categoryIds.length
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
                    </ListGroupItem>
                  )
                )
              ) : null}
            </ListGroup>
          </Container>
        ) : (
          <Loading />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  post: state.post,
  categories: state.category.categories,
});

export default connect(mapStateToProps, {})(Posts);
