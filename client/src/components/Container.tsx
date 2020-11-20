import React, { Component } from "react";
import { connect } from "react-redux";

interface propTypes {
  isAuthenticated: boolean;
  user: any;
}

class Container extends Component<propTypes> {
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <h1>You are logged in as {this.props.user.name}</h1>
        ) : (
          <h1>Welcome</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Container);
