import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { fireEvent, render } from "@testing-library/react";
import NavBar from "../../../components/navbar/NavBar";
import reducer from "../../../store/reducers/index";
import mockStore from "../../mockStore";
import { MemoryRouter } from "react-router-dom";

describe("Test NavBar component", () => {
  let store: any;
  console.error = jest.fn();

  beforeEach(() => {
    store = createStore(reducer, mockStore);
  });

  it("Render NavBar component if user is 'member'", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );

    const result = document.querySelector("body");
    expect(result).toBeTruthy();
  });

  it("Render NavBar component if user is 'admin'", () => {
    const customStore = createStore(reducer, {
      ...mockStore,
      auth: {
        ...mockStore.auth,
        user: { ...mockStore.auth.user, role: "admin" },
      },
    });
    render(
      <MemoryRouter>
        <Provider store={customStore}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );
    const result = document.querySelector("body");
    expect(result).toBeTruthy();
  });

  it("Render NavBar component if user is not authenticated", () => {
    const customStore = createStore(reducer, {
      ...mockStore,
      auth: {
        ...mockStore.auth,
        isAuthenticated: false,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={customStore}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );

    const result = document.querySelector("body");
    expect(result).toBeTruthy();
  });

  it("Click on NavBar toggler", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );
    const navBarToggler = document.querySelector(".navbar-toggler");
    if (navBarToggler) fireEvent.click(navBarToggler);
  });
});
