import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import Register from "./auth/Register";
import Logout from "./auth/Logout";
import Login from "./auth/Login";

interface propTypes {
  auth: any;
}

class NavBar extends Component<propTypes> {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const member = (
      <>
        <NavItem>
          <span className="navbar-text">{user ? user.name : null}</span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );

    const guest = (
      <>
        <NavItem>
          <Login />
        </NavItem>
        <NavItem>
          <Register />
        </NavItem>
      </>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          {/* className="mb-5" */}
          <Container>
            <NavbarBrand href="/">Interest Cloud</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? member : guest}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(NavBar);
