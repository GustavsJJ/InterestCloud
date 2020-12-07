import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../store/actions/postActions";
import store from "../store/store";
import { IPost } from "../types/interfaces";
import { withRouter } from "react-router";
import Loading from "./tool/Loading";
import { ListGroup, ListGroupItem, Media } from "reactstrap";
import "./PostInfo.css";

interface propTypes {
  post: IPost;
  postLoading: boolean;
  match: any;
}

export class PostInfo extends Component<propTypes> {
  componentDidMount() {
    const id = this.props.match.params.id;
    store.dispatch(getPostById(id));
  }
  render() {
    return (
      <div className="post-container">
        {this.props.postLoading ? (
          <div>
            <Loading />
          </div>
        ) : this.props.post ? (
          <div className="post-box" style={{ justifyContent: "stretch" }}>
            <ListGroup>
              <ListGroupItem>
                <Media className="post">
                  <Media body style={{ fontSize: "1em" }}>
                    <Media heading>{this.props.post.title}</Media>
                    {this.props.post.description}
                  </Media>
                </Media>
              </ListGroupItem>
            </ListGroup>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  post: state.post.post,
  postLoading: state.post.postLoading,
});

export default withRouter(connect(mapStateToProps, {})(PostInfo));
