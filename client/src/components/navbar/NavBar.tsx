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
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Categories from "./CategoriesDropdown";
import UserDropdown from "./UserDropdown";
import { IAuth } from "../../types/interfaces";

interface propTypes {
  auth: IAuth;
}

class NavBar extends Component<propTypes> {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, isLoading, user } = this.props.auth;
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
        {(user?.role === "admin" || user?.role === "reporter") && (
          <NavLink
            active
            className="ml-2"
            style={{ color: "var(--info)" }}
            href="/newPost"
          >
            <b>New Post +</b>
          </NavLink>
          // <NavItem>
          //   <Button href="/newPost" color="info" className="my-2" outline>
          //     New Post +
          //   </Button>
          // </NavItem>
        )}

        <NavItem>
          <UserDropdown />
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
