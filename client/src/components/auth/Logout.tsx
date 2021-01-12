import React, { Component } from "react";
import { DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

interface propTypes {
  logout: Function;
}

export class Logout extends Component<propTypes> {
  // logs out user
  onLogout = () => {
    this.props.logout();
  };

  render() {
    return <DropdownItem onClick={this.onLogout}>Logout</DropdownItem>;
  }
}

export default connect(null, { logout })(Logout);
