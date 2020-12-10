import React, { Component } from "react";
import { Badge, Container, ListGroup, ListGroupItem, Media } from "reactstrap";
import { connect } from "react-redux";
import store from "../store/store";
import { getPosts } from "../store/actions/postActions";
import "./Posts.css";
import Loading from "./tool/Loading";
import { Link } from "react-router-dom";
import { IPost } from "../types/interfaces";

interface propTypes {
  posts: IPost[];
}

export class Posts extends Component<propTypes> {
  componentDidMount() {
    store.dispatch(getPosts());
  }

  render() {
    return (
      <div>
        {this.props.posts.length !== 0 ? (
          <Container className="posts-container mb-5">
            <ListGroup>
              {this.props.posts.map(({ _id, title, description }, i) => (
                <ListGroupItem>
                  <Media className="post my-2">
                    <Media>
                      <Link to={`/post/${_id}`}>
                        <Media
                          object
                          // data-src="holder.js/64x64"
                          className="post-image"
                          src={`https://picsum.photos/300/300?random=${i}`}
                          alt="Generic placeholder image"
                        />
                      </Link>
                    </Media>
                    <Media body>
                      <Media heading>
                        <Link to={`/post/${_id}`}>{title}</Link>
                      </Media>
                      {description.length > 1100
                        ? description.substring(0, 1100) + "..."
                        : description}

                      <div
                        className="d-flex flex-wrap mt-5"
                        style={{ float: "right", display: "block" }}
                      >
                        <h3 className="mr-2">
                          <Badge color="blue" href="/category/Science">
                            Science
                          </Badge>
                        </h3>
                        <h3 className="mr-2">
                          <Badge color="green">Travel</Badge>
                        </h3>
                        <h3 className="mr-2">
                          <Badge color="brown">History</Badge>
                        </h3>
                      </div>
                    </Media>
                  </Media>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Container>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, {})(Posts);
