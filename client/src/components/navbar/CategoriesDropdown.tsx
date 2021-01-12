import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
} from "reactstrap";
import { getCategories } from "../../store/actions/categoryActions";
import { ICategory } from "../../types/interfaces";
import "./NavbarDropdown.css";

interface propTypes {
  categories: ICategory[];
}

export class Categories extends Component<propTypes> {
  state = {
    isOpen: false,
  };

  // toggles dropdown
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <NavItem>
        <Dropdown
          className="navbar-dropdown"
          inNavbar
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret nav>
            Category
          </DropdownToggle>
          <DropdownMenu className="bg-dark py-0" style={{ width: "100%" }}>
            {this.props.categories.length &&
              this.props.categories.map((category) => (
                <Fragment>
                  <DropdownItem
                    className="py-2"
                    href={`/category/${category.name}`}
                    style={{
                      borderBottom: `3px solid var(--${category.color})`,
                    }}
                  >
                    {category.name}
                  </DropdownItem>
                </Fragment>
              ))}
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    );
  }
}

const mapStateToProps = (state: any) => ({
  categories: state.category.categories,
});

export default connect(mapStateToProps, { getCategories })(Categories);
