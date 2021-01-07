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
import { changePassword } from "../../store/actions/userActions";
import { IAuth } from "../../types/interfaces";

interface propTypes {
  auth: IAuth;
  changePassword: Function;
}

export class ChangePassword extends Component<propTypes> {
  state = {
    modal: false,
    oldPsw: "",
    newPsw: "",
    newPswConf: "",
    alert: false,
    alertColor: "",
    message: "",
  };

  // toggles modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      alert: false,
      alertColor: "",
      message: "",
      oldPsw: "",
      newPsw: "",
      newPswConf: "",
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
    this.onCloseAlert();
    const { oldPsw, newPsw, newPswConf } = this.state;

    if (oldPsw === newPsw)
      return this.onOpenAlert(
        "New password cannot be the same as the old password",
        true
      );

    if (newPsw !== newPswConf)
      return this.onOpenAlert("Passwords do not match", true);

    this.props.changePassword(oldPsw, newPsw, this.onOpenAlert);
  };

  render() {
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Change Password</ModalHeader>
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
                <Label for="oldPsw">Old Password</Label>
                <Input
                  type="password"
                  name="oldPsw"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  value={this.state.oldPsw}
                  style={{ marginBottom: "10px" }}
                />
                <Label for="surname">New Password</Label>
                <Input
                  type="password"
                  name="newPsw"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  value={this.state.newPsw}
                  style={{ marginBottom: "10px" }}
                />
                <Label for="newPswConf">Confirm New Password</Label>
                <Input
                  type="password"
                  name="newPswConf"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  value={this.state.newPswConf}
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
              Change
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
          Change Password
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
