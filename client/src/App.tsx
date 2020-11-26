import React, { Component } from "react";
import logo from "./logo.svg";

import store from "./store/store";
import { loadUser } from "./store/actions/authActions";
import { Provider } from "react-redux";
import NavBar from "./components/NavBar";
import Container from "./components/Container";
import Posts from "./components/Posts";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NavBar />
          <header className="App-header">
            <Container />
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link mb-3"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Posts />
          </header>
          <footer className="App-footer bg-dark">
            <p
              className="p-2"
              style={{ marginBottom: "0px", alignItems: "left" }}
            >
              Made by: GustavsJJ
            </p>
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
