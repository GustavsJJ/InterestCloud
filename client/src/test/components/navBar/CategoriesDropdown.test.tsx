import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { fireEvent, render } from "@testing-library/react";
import CategoriesDropdown from "../../../components/navbar/CategoriesDropdown";
import reducer from "../../../store/reducers/index";
import mockStore from "../../mockStore";
import { MemoryRouter } from "react-router-dom";

describe("Test CategoriesDropdown component", () => {
  let store: any;
  console.error = jest.fn();

  beforeEach(() => {
    store = createStore(reducer, mockStore);
  });

  it("Render CategoriesDropdown component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CategoriesDropdown />
        </Provider>
      </MemoryRouter>
    );

    const result = document.querySelector(".navbar-dropdown");
    expect(result).toBeTruthy();
  });

  it("Click on CategoriesDropdown dropdown toggle", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CategoriesDropdown />
        </Provider>
      </MemoryRouter>
    );

    const dropdownToggle = document.querySelector(".dropdown-toggle");
    if (dropdownToggle) fireEvent.click(dropdownToggle);
    expect(dropdownToggle?.getAttribute("aria-expanded")).toBeTruthy();
  });
});
