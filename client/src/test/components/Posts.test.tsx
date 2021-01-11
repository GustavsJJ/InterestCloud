import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { render } from "@testing-library/react";
import Posts from "../../components/Posts";
import reducer from "../../store/reducers/index";
import mockStore from "../mockStore";
import { MemoryRouter } from "react-router-dom";

describe("Test Posts component", () => {
  let store: any;
  console.error = jest.fn();

  beforeEach(() => {
    store = createStore(reducer, mockStore);
  });

  it("Render Posts component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Posts />
        </Provider>
      </MemoryRouter>
    );

    const result = document.querySelector("body");
    const postsContainer = document.querySelector(
      ".posts-container .list-group"
    );
    expect(result).toBeTruthy();
    expect(postsContainer?.childElementCount).toBe(mockStore.post.posts.length);
  });

  it("Render Posts component if there are no posts", () => {
    store = createStore(reducer, {
      ...mockStore,
      post: { ...mockStore.post, posts: [] },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Posts />
        </Provider>
      </MemoryRouter>
    );

    const result = document.querySelector(".posts-container .list-group li h2");
    expect(result).toBeTruthy();
    expect(result?.innerHTML).toBe("No post found");
  });

  it("Render Posts component if postsLoading is set to true", () => {
    store = createStore(reducer, {
      ...mockStore,
      post: { ...mockStore.post, postsLoading: true },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Posts />
        </Provider>
      </MemoryRouter>
    );

    const result = document.querySelector(".loading-spinner");
    expect(result).toBeTruthy();
  });
});
