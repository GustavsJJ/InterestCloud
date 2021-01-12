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
import Register from "../auth/Register";
import Login from "../auth/Login";
import Categories from "./CategoriesDropdown";
import UserDropdown from "./UserDropdown";
import { IAuth } from "../../types/interfaces";
import "./NavBar.css";

interface propTypes {
  auth: IAuth;
}

class NavBar extends Component<propTypes> {
  state = {
    isOpen: false,
  };

  // toggles dropdown
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

    // authenticated user links
    const member = (
      <>
        {
          // adds "New Post +" button if user is admin or reporter
          (user?.role === "admin" || user?.role === "reporter") && (
            <NavLink
              active
              className="ml-2 newPost-button"
              style={{ color: "var(--info)" }}
              href="/newPost"
            >
              <b>New Post +</b>
            </NavLink>
          )
        }

        <NavItem>
          <UserDropdown />
        </NavItem>
      </>
    );

    // unauthenticated user links
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
                {isAuthenticated || localStorage.getItem("userName")
                  ? member
                  : unregistered}
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
