import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import { updateProfile } from "../../store/actions/userActions";
import { IAuth } from "../../types/interfaces";

interface propTypes {
  auth: IAuth;
  updateProfile: Function;
}

export class EditProfile extends Component<propTypes> {
  state = {
    modal: false,
    name: "",
    surname: "",
    email: "",
    alert: false,
    alertColor: "",
    message: "",
  };

  // toggles modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      name: this.props.auth.user.name,
      surname: this.props.auth.user.surname,
      email: this.props.auth.user.email,
      alert: false,
      alertColor: "",
      message: "",
    });
  };

  // changes state values
  onChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // executes onSubmit if "Enter" was pressed
  onKeyDown = (e: any) => {
    if (e.key === "Enter") this.onSubmit(e);
  };

  // opens alert
  onOpenAlert = (msg: string, isError: boolean) => {
    this.setState({
      message: msg,
      alert: true,
      alertColor: isError ? "danger" : "success",
    });
  };

  // closes alert
  onCloseAlert = () => {
    this.setState({
      message: "",
      alert: false,
    });
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    const { name, surname, email } = this.state;
    this.props.updateProfile(name, surname, email, this.onOpenAlert);
  };

  render() {
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
            <Alert
              color={this.state.alertColor}
              isOpen={this.state.alert}
              toggle={this.onCloseAlert}
            >
              {this.state.message}
            </Alert>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  value={this.state.name}
                  style={{ marginBottom: "10px" }}
                />
                <Label for="surname">Surname</Label>
                <Input
                  type="text"
                  name="surname"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  value={this.state.surname}
                  style={{ marginBottom: "10px" }}
                />
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  value={this.state.email}
                  style={{ marginBottom: "10px" }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="mx-2 mt-2"
              color="primary"
              block
              onClick={this.onSubmit}
            >
              Update
            </Button>
            <Button
              className="mx-2 my-1"
              color="primary"
              outline
              onClick={this.toggle}
              block
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Button
          color="blue"
          style={{ marginTop: "20px" }}
          outline
          block
          onClick={this.toggle}
        >
          Edit Profile
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateProfile })(EditProfile);
