import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../store/actions/postActions";
import store from "../store/store";
import { IPost } from "../types/interfaces";
import { withRouter } from "react-router";
import Loading from "./tool/Loading";
import {
  Container,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";
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
    const {
      title,
      description,
      imageId,
      author,
      date,
      categoryIds,
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
        ) : this.props.post ? (
          <div style={{ fontSize: "1rem" }}>
            <div>
              <Jumbotron style={{ backgroundColor: "white" }}>
                <Media className="post-box" style={{ width: "100%" }}>
                  <Media
                    className="post-image mr-3 mb-3"
                    style={{ float: "left" }}
                  >
                    {imageId && (
                      <Media
                        object
                        src={`/api/images/render/${imageId}`}
                        alt="Generic placeholder image"
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
                      style={{
                        fontSize: "1rem",
                        overflowX: "hidden",
                        whiteSpace: "pre-wrap",
                        fontFamily: "inherit",
                      }}
                    >
                      {description}
                    </p>
                  </Media>
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
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  post: state.post.post,
  postLoading: state.post.postLoading,
});

export default withRouter(connect(mapStateToProps, {})(PostInfo));
