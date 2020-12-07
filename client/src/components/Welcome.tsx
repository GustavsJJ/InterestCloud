import React, { Component } from "react";
import { connect } from "react-redux";

interface propTypes {
  user: any;
}

class Welcome extends Component<propTypes> {
  render() {
    const time = new Date(Date.now()).getHours();
    const name = this.props.user?.name;

    return (
      <div className="my-5">
        <h1>
          {time >= 5 && time < 12
            ? "Good morning"
            : time >= 12 && time < 17
            ? "Good afternoon"
            : "Good evening"}
          {name && `, ${name}`}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Welcome);
