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
import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";

interface propTypes {
  isAuthenticated: boolean | null | undefined;
  error: any;
  login: Function;
  clearErrors: Function;
}

class Login extends Component<propTypes> {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
  };

  // returns error if login was not successful or closes modal if login was successful
  componentDidUpdate(prevProps: propTypes) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") this.setState({ msg: error.msg });
      else this.setState({ msg: null });
    }

    // Close modal if login was successful
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  // toggles login modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.props.clearErrors();
  };

  // changes input value
  onChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // if Enter is pressed onSubmit is called
  onKeyDown = (e: any) => {
    if (e.key === "Enter") this.onSubmit(e);
  };

  // tries to login user
  onSubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password)
      // checks if all fields are filled
      this.setState({ msg: "Please enter all fields" });

    const user = {
      email,
      password,
    };

    this.props.login(user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  style={{ marginBottom: "10px" }}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  style={{ marginBottom: "10px" }}
                />
                <Button
                  color="dark"
                  onClick={this.onSubmit}
                  style={{ marginTop: "30px" }}
                  block
                >
                  Login
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

export default connect(mapStateToProps, { login, clearErrors })(Login);
