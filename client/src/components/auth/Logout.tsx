import React, { Component, Fragment } from "react";
import { DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

interface propTypes {
  logout: () => {};
}

export class Logout extends Component<propTypes> {
  render() {
    return (
      <DropdownItem onClick={this.props.logout} href="#">
        Logout
      </DropdownItem>
    );
  }
}

export default connect(null, { logout })(Logout);
