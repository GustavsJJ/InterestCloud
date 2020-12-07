import React, { Component } from "react";
import logo from "./logo.svg";

import store from "./store/store";
import { loadUser } from "./store/actions/authActions";
import { Provider } from "react-redux";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Posts from "./components/Posts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./style/App.css";
import "./style/custom-bootstrap.css";
import Footer from "./components/Footer";
import About from "./components/About";
import Category from "./components/Category";
import PostInfo from "./components/PostInfo";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <NavBar />
            <div className="App-container">
              {/* <img src={logo} className="App-logo" alt="logo" />
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
            </a> */}
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <>
                      <Welcome />
                      <Posts />
                    </>
                  )}
                />
                <Route exact path="/post/:id" render={() => <PostInfo />} />
                <Route exact path="/about" render={() => <About />} />
                <Route
                  exact
                  path="/category/:cat"
                  render={() => <Category />}
                />

                <Route render={() => <h1>404 - Page not found</h1>} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
