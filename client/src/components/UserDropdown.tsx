import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
} from "reactstrap";
import { IAuth } from "../types/interfaces";
import Logout from "./auth/Logout";
import "./NavbarDropdown.css";

interface propTypes {
  auth: IAuth;
}

export class UserDropdown extends Component<propTypes> {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { user } = this.props.auth;

    return (
      <NavItem>
        <Dropdown
          className="navbar-dropdown"
          inNavbar
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret nav>
            {user ? user.name : null}
          </DropdownToggle>
          <DropdownMenu className="bg-dark" style={{ width: "100%" }}>
            <DropdownItem href="/user">Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/user/history">History</DropdownItem>
            <DropdownItem divider />
            <Logout />
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UserDropdown);
