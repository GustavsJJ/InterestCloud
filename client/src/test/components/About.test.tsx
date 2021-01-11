import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../../components/About";

describe("Test About component", () => {
  it("Render About component", () => {
    render(<About />);
    const result = document.querySelector("body");
    const about = screen.getByText(/About/i);
    const text = screen.getByText(
      /News portal that sorts articles by your interests/i
    );

    expect(result).toBeTruthy();
    expect(about).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
