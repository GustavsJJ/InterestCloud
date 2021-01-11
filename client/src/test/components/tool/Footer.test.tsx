import { render, screen } from "@testing-library/react";
import Footer from "../../../components/tool/Footer";

describe("Test Footer component", () => {
  it("Render Footer component", () => {
    render(Footer());
    const result = document.querySelector("footer");
    const madeBy = screen.getByText(/Made by:/i);
    const Version = screen.getByText(/Version:/i);

    expect(result).toBeTruthy();
    expect(madeBy).toBeTruthy();
    expect(Version).toBeTruthy();
  });
});
