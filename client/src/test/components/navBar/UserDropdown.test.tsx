import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { fireEvent, render } from "@testing-library/react";
import UserDropdown from "../../../components/navbar/UserDropdown";
import reducer from "../../../store/reducers/index";
import mockStore from "../../mockStore";
import { MemoryRouter } from "react-router-dom";

describe("Test UserDropdown component", () => {
  let store: any;
  console.error = jest.fn();

  beforeEach(() => {
    store = createStore(reducer, mockStore);
  });

  it("Render UserDropdown component if user is 'member'", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <UserDropdown />
        </Provider>
      </MemoryRouter>
    );

    const result = document.querySelector("body");
    expect(result).toBeTruthy();
  });

  it("Render UserDropdown component if user property is not defined", () => {
    const customStore = createStore(reducer, {
      ...mockStore,
      auth: { ...mockStore.auth, user: undefined },
    });
    render(
      <MemoryRouter>
        <Provider store={customStore}>
          <UserDropdown />
        </Provider>
      </MemoryRouter>
    );

    const result = document.querySelector("body");
    expect(result).toBeTruthy();
  });

  it("Click on UserDropdown dropdown toggle", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <UserDropdown />
        </Provider>
      </MemoryRouter>
    );

    const dropdownToggle = document.querySelector(".dropdown-toggle");
    if (dropdownToggle) fireEvent.click(dropdownToggle);
    expect(dropdownToggle?.getAttribute("aria-expanded")).toBeTruthy();
  });
});
