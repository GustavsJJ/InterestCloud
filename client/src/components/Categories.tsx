import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
} from "reactstrap";
import "./Categories.css";

export class Categories extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <NavItem>
          <Dropdown
            className="categories-dropdown"
            inNavbar
            isOpen={this.state.isOpen}
            toggle={this.toggle}
          >
            <DropdownToggle caret nav>
              Category
            </DropdownToggle>
            <DropdownMenu className="bg-dark" style={{ width: "100%" }}>
              <DropdownItem href="/category/politics">Politics</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/category/science">Science</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/category/business">Business</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/category/sports">Sports</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/category/culture">Culture</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/category/travel">Travel</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/category/history">History</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      </div>
    );
  }
}

export default Categories;
