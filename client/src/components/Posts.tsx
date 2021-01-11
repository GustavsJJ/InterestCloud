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

  // tries to get posts when component is rendered
  componentDidMount() {
    store.dispatch(getPosts(this.props.sortBy));
  }

  render() {
    return (
      <Container>
        {
          // if posts are not loading
          !this.props.post.postsLoading ? (
            <Container fluid className="posts-container mb-5">
              <ListGroup>
                {
                  // if posts are not loading and posts length is 0
                  !this.props.post.posts.length ? (
                    <ListGroupItem className="py-5">
                      <h2>No post found</h2>
                    </ListGroupItem>
                  ) : (
                    // if posts are not loading and posts length is not 0 each post is being rendered
                    this.props.post.posts.map(
                      ({ _id, title, description, categoryIds, imageId }) => (
                        <ListGroupItem key={_id}>
                          <Media className="post mt-2">
                            <Media className="image-box">
                              <Link to={`/post/${_id}`}>
                                {imageId && (
                                  <Media
                                    object
                                    className="post-image mb-1"
                                    style={{
                                      maxWidth: "300px",
                                      maxHeight: "300px",
                                    }}
                                    src={`/api/images/render/${imageId}`}
                                    alt={`Image not found`}
                                  />
                                )}
                              </Link>
                            </Media>
                            <Media body className="post-media-body">
                              <Media heading>
                                <Link to={`/post/${_id}`}>{title}</Link>
                              </Media>
                              <p
                                style={{
                                  whiteSpace: "break-spaces",
                                }}
                              >
                                {description.length > 900
                                  ? description.substring(0, 900) + "..."
                                  : description}
                              </p>
                            </Media>
                          </Media>

                          <div className="categories-floater pt-3 pr-3">
                            <div />
                            <div className="categories">
                              {categoryIds.length &&
                                categoryIds.map((categoryId) => {
                                  const category = this.props.categories.find(
                                    (cat) => cat._id === categoryId
                                  );
                                  return (
                                    <h3 key={categoryId}>
                                      <Badge
                                        color={category?.color}
                                        href={`/category/${category?.name}`}
                                      >
                                        {category?.name}
                                      </Badge>
                                    </h3>
                                  );
                                })}
                            </div>
                          </div>
                        </ListGroupItem>
                      )
                    )
                  )
                }
              </ListGroup>
            </Container>
          ) : (
            // if posts are loading then Loading component is being rendered
            <Loading />
          )
        }
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  post: state.post,
  categories: state.category.categories,
});

export default connect(mapStateToProps, {})(Posts);
