import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { connect } from "react-redux";
import store from "../store/store";
import { getPosts } from "../store/actions/postActions";
import "./Posts.css";
import Loading from "./tool/Loading";

interface propTypes {
  posts: any[];
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
              {this.props.posts.map(({ _id, title, description }) => (
                <ListGroupItem>
                  <ListGroupItemHeading>{title}</ListGroupItemHeading>
                  <ListGroupItemText>{description}</ListGroupItemText>
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
