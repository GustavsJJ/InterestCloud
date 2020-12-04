import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import Register from "./auth/Register";
import Logout from "./auth/Logout";
import Login from "./auth/Login";
import Categories from "./Categories";

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
    const leftItems = (
      <>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavItem>
          <Categories />
        </NavItem>
      </>
    );

    const member = (
      <>
        <NavLink href="/user">{user ? user.name : null}</NavLink>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );

    const unregistered = (
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
        <Navbar color="dark" dark expand="lg">
          {/* className="mb-5" */}
          <Container>
            <NavbarBrand href="/">
              <span>Interest Cloud</span>
            </NavbarBrand>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>{leftItems}</Nav>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? member : unregistered}
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
