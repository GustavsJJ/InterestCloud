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
import { clearErrors, returnErrors } from "../../store/actions/errorActions";

interface propTypes {
  isAuthenticated: boolean | null | undefined;
  error: any;
  register: Function;
  clearErrors: Function;
  returnErrors: Function;
}

class Register extends Component<propTypes> {
  state = {
    modal: false,
    name: "",
    surname: "",
    email: "",
    password: "",
    confPassword: "",
    msg: null,
  };

  // shows error or closes modal if registration was successful
  componentDidUpdate(prevProps: propTypes) {
    const { error, isAuthenticated } = this.props;
    // shows error
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") this.setState({ msg: error.msg });
      else this.setState({ msg: null });
    }

    // Close modal if registration was successful
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  // toggles modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.props.clearErrors();
  };

  // changes state values
  onChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // executes onSubmit if "Enter" was pressed
  onKeyDown = (e: any) => {
    if (e.key === "Enter") this.onSubmit(e);
  };

  // tries to register
  onSubmit = (e: any) => {
    e.preventDefault();

    const { name, surname, email, password, confPassword } = this.state;
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/;

    if (!name || !surname || !email || !password || !confPassword)
      // checks if all fields are filled
      this.setState({ msg: "Please enter all fields" });
    else if (!email.match(emailRegex))
      // validates email
      this.setState({ msg: "Email is not valid" });
    else if (password !== confPassword)
      // validates password
      this.setState({ msg: "Passwords do not match" });
    else {
      const newUser = {
        name,
        surname,
        email,
        password,
      };
      this.props.register(newUser);
    }
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
                  onKeyDown={this.onKeyDown}
                  style={{ marginBottom: "10px" }}
                />

                <Label for="surname">Surname</Label>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Surname"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  style={{ marginBottom: "10px" }}
                />

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
                <Label for="confPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="confPassword"
                  id="confPassword"
                  placeholder="Password"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  style={{ marginBottom: "10px" }}
                />
                <Button
                  color="dark"
                  onClick={this.onSubmit}
                  onKeyDown={this.onKeyDown}
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

export default connect(mapStateToProps, {
  register,
  clearErrors,
  returnErrors,
})(Register);
