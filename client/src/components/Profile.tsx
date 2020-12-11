import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Button,
  ButtonGroup,
  Container,
  Jumbotron,
  Media,
  Progress,
} from "reactstrap";
import { IAuth, ICategory } from "../types/interfaces";
import Loading from "./tool/Loading";
import "./Profile.css";
import ErrorView from "./tool/ErrorView";

interface propTypes {
  auth: IAuth;
  categories: ICategory[];
}

export class Profile extends Component<propTypes> {
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
                  <Media heading>Profile</Media>
                  <hr />

                  <div>
                    <div
                      className="profileGeneralInfo d-flex flex-wrap"
                      style={{ justifyContent: "start" }}
                    >
                      <div>
                        <h6>Name: </h6>
                        <p>{user.name ? user.name : "undefined"}</p>
                      </div>
                      <div>
                        <h6>Surname: </h6>
                        <p>{user.surname ? user.surname : "undefined"}</p>
                      </div>
                      <div>
                        <h6>Email: </h6>
                        <p>{user.email ? user.email : "undefined"}</p>
                      </div>
                    </div>

                    <div className="interestProgressBar">
                      <h6>Interest: </h6>
                      <Progress multi className="profileInterestBar">
                        <Progress
                          bar
                          color={this.props.categories[0]?.color}
                          value="15"
                        >
                          15%
                        </Progress>
                        <Progress bar color="green" value="30" />
                        <Progress bar color="cyan" value="25" />
                        <Progress bar color="yellow" value="20" />
                        <Progress bar color="blue" value="5" />
                        <Progress bar color="brown" value="5" />
                      </Progress>
                    </div>
                    <hr />
                    <div className="interestEditor mt-3">
                      <h6 className="mr-3">Add interest by 5 points:</h6>
                      <div>
                        {this.props.categories.map((category) => (
                          <Button color={category.color}>
                            {`${category.name} +5`}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="interestEditor mt-3">
                      <h6 className="mr-3">Add interest by 50 points:</h6>
                      <div>
                        {this.props.categories.map((category) => (
                          <Button color={category.color}>
                            {`${category.name} +50`}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <hr />
                    <div
                      className="filler"
                      style={{ minHeight: "calc(100vh - 56rem)" }}
                    ></div>
                    <div className="bottomButtons">
                      <Button
                        color="blue"
                        style={{ marginTop: "20px" }}
                        block
                        outline
                      >
                        Edit Profile
                      </Button>
                      <Button
                        color="dark"
                        style={{ marginTop: "20px" }}
                        block
                        outline
                      >
                        Reset Interest
                      </Button>
                      <Button
                        color="danger"
                        style={{ marginTop: "20px" }}
                        block
                      >
                        Delete Profile
                      </Button>
                    </div>
                  </div>
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

export default connect(mapStateToProps, {})(Profile);
