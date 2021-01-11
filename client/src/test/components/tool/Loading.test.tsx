import React from "react";
import { render } from "@testing-library/react";
import Loading from "../../../components/tool/Loading";

describe("Test Loading component", () => {
  it("Render Loading component", () => {
    render(<Loading />);
    const result = document.querySelector(".loading-spinner");
    const loading1 = document.querySelector(
      ".loading-spinner div:nth-child(1)"
    );
    const loading2 = document.querySelector(
      ".loading-spinner div:nth-child(2)"
    );
    const loading3 = document.querySelector(
      ".loading-spinner div:nth-child(3)"
    );

    expect(result).toBeTruthy();
    expect(loading1).toBeTruthy();
    expect(loading2).toBeTruthy();
    expect(loading3).toBeTruthy();
  });
});
