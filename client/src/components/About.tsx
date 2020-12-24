import React, { Component } from "react";

export class About extends Component {
  render() {
    return (
      <div>
        <div
          className="mx-auto"
          style={{ maxWidth: "90%", display: "flex", flexDirection: "column" }}
        >
          <h1>About</h1>
          <p>News portal that sorts articles by your interests</p>
        </div>
      </div>
    );
  }
}

export default About;
