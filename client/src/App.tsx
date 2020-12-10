import React, { Component } from "react";

import store from "./store/store";
import { loadUser } from "./store/actions/authActions";
import { Provider } from "react-redux";
import NavBar from "./components/navbar/NavBar";
import Welcome from "./components/Welcome";
import Posts from "./components/Posts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./style/custom-bootstrap.css";
import "./style/App.css";
import Footer from "./components/Footer";
import About from "./components/About";
import Category from "./components/Category";
import PostInfo from "./components/PostInfo";
import Profile from "./components/Profile";
import { getCategories } from "./store/actions/categoryActions";
import ErrorView from "./components/tool/ErrorView";

class App extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    store.dispatch(loadUser());
    store.dispatch(getCategories());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <NavBar />
            <div className="App-container">
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
                <Route exact path="/user" render={() => <Profile />} />
                <Route exact path="/post/:id" render={() => <PostInfo />} />
                <Route exact path="/about" render={() => <About />} />
                <Route
                  exact
                  path="/category/:cat"
                  render={() => <Category />}
                />

                <Route render={() => ErrorView("404", "Not Found")} />
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
