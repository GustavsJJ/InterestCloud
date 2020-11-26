import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";

interface propTypes {
  isAuthenticated: boolean | null | undefined;
  error: any;
  register: Function;
  clearErrors: Function;
}

class Register extends Component<propTypes> {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  componentDidUpdate(prevProps: propTypes) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id == "REGISTER_FAIL") this.setState({ msg: error.msg });
      else this.setState({ msg: null });
    }

    // Close modal if registration was successful
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.props.clearErrors();
  };

  onChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e: any) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password,
    };

    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                  style={{ marginBottom: "10px" }}
                />
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  style={{ marginBottom: "10px" }}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  style={{ marginBottom: "10px" }}
                />
                <Button
                  color="dark"
                  onClick={this.onSubmit}
                  style={{ marginTop: "30px" }}
                  block
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
