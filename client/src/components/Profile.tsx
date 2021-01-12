import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  ButtonGroup,
  Container,
  Jumbotron,
  Media,
  Modal,
  ModalBody,
  ModalHeader,
  Progress,
} from "reactstrap";
import { IAuth, ICategory } from "../types/interfaces";
import Loading from "./tool/Loading";
import "./Profile.css";
import ErrorView from "./tool/ErrorView";
import { addPoints, resetPoints } from "../store/actions/categoryActions";
import { deleteSelf } from "../store/actions/authActions";
import EditProfile from "./profile/EditProfile";
import ChangePassword from "./profile/ChangePassword";

interface propTypes {
  auth: IAuth;
  categories: ICategory[];
  addPoints: Function;
  resetPoints: Function;
  deleteSelf: Function;
}

export class Profile extends Component<propTypes> {
  state = {
    maxPoints: 1, // sum of category points
    modal: false,
    modalText: "",
    modalActionText: "",
    modalActionFunction: () => {},
  };

  // sets maxPoints to sum of category points
  componentDidUpdate(prevProps: propTypes) {
    if (this.props.categories !== prevProps.categories) {
      const categories = this.props.categories;
      let maxPoints = 0;
      categories.forEach(
        (category) => (maxPoints += category.points ? category.points : 0)
      );
      this.setState({ maxPoints: maxPoints });
    }
  }

  // adds 5% of maxPoints to the category, if points are less than 1 then 1 point is added
  onAddPoints = (categoryId: string) => {
    let points = Math.floor((this.state.maxPoints / 100) * 5);
    if (points < 1) points = 1;
    this.props.addPoints(categoryId, points);
  };

  // removes 5% of maxPoints to the category, if points are less than 1 then 1 point is removed
  onRemovePoints = (categoryId: string) => {
    let points = Math.floor((this.state.maxPoints / 100) * 5);
    if (points < 1) points = 1;
    points = points * -1;
    this.props.addPoints(categoryId, points);
  };

  // resets points
  onPointReset = () => {
    this.props.resetPoints();
    this.setState({ modal: false });
  };

  // delete user
  onDeleteSelf = () => {
    this.props.deleteSelf();
    this.setState({ modal: false });
  };

  // open delete modal
  deleteModal = () => {
    this.setState({
      modal: !this.state.modal,
      modalText: "Are you sure you want to delete this account?",
      modalActionText: "Delete",
      modalActionFunction: this.onDeleteSelf,
    });
  };

  // open reset modal
  resetModal = () => {
    this.setState({
      modal: !this.state.modal,
      modalText: "Are you sure you want to reset interest?",
      modalActionText: "Reset",
      modalActionFunction: this.onPointReset,
    });
  };

  // toggles modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { user, isAuthenticated, isLoading } = this.props.auth;
    const categories = this.props.categories;

    return (
      <Container className="post-container mt-5">
        {
          // if user is not being loaded and user is not authenticated
          !isLoading && !isAuthenticated ? (
            ErrorView("401", "Unauthorized")
          ) : // if user is being loaded
          isLoading ? (
            <Loading />
          ) : (
            // if user is not being loaded and user is authenticated
            <div>
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
                          {
                            // render category interest bar
                            categories.map((category) => {
                              const points = category.points
                                ? (category.points / this.state.maxPoints) * 100
                                : 0;
                              return (
                                <Progress
                                  bar
                                  color={category.color}
                                  value={points}
                                >
                                  {points > 10 && `${points.toFixed(0)}%`}
                                </Progress>
                              );
                            })
                          }
                        </Progress>
                      </div>
                      <hr />
                      <div className="interestEditor mt-3">
                        <h6 className="mr-3">Add interest:</h6>
                        <div>
                          {categories.map((category) => (
                            // for each category render "category +" button
                            <Button
                              color={category.color}
                              onClick={() => this.onAddPoints(category._id)}
                            >
                              {`${category.name} +`}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="interestEditor mt-3">
                        <h6 className="mr-3">Remove interest:</h6>
                        <div>
                          {categories.map((category) => (
                            // for each category render "category -" button
                            <Button
                              color={category.color}
                              onClick={() => this.onRemovePoints(category._id)}
                            >
                              {`${category.name} -`}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <hr />
                      {/* renders "Edit Profile", "ChangePassword", "Reset Interest" and "Delete Profile" buttons */}
                      <div className="bottomButtons">
                        <ButtonGroup style={{ width: "100%" }}>
                          <EditProfile />
                          <ChangePassword />
                        </ButtonGroup>

                        <Button
                          color="dark"
                          style={{ marginTop: "20px" }}
                          block
                          outline
                          onClick={this.resetModal}
                        >
                          Reset Interest
                        </Button>
                        <Button
                          color="danger"
                          style={{ marginTop: "20px" }}
                          block
                          onClick={this.deleteModal}
                        >
                          Delete Profile
                        </Button>
                        {/* confirmation button */}
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                          <ModalHeader toggle={this.toggle} />
                          <ModalBody style={{ textAlign: "center" }}>
                            {this.state.modalText}
                          </ModalBody>
                          <Button
                            className="mx-3 mt-2"
                            color="danger"
                            onClick={this.state.modalActionFunction}
                          >
                            {this.state.modalActionText}
                          </Button>
                          <Button
                            className="mx-3 my-3"
                            color="primary"
                            outline
                            onClick={this.toggle}
                          >
                            Cancel
                          </Button>
                        </Modal>
                      </div>
                    </div>
                  </Media>
                </Media>
              </Jumbotron>
            </div>
          )
        }
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  categories: state.category.categories,
});

export default connect(mapStateToProps, { addPoints, resetPoints, deleteSelf })(
  Profile
);
