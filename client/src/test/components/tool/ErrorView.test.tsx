import { render } from "@testing-library/react";
import ErrorView from "../../../components/tool/ErrorView";

describe("Test ErrorView component", () => {
  it("Render ErrorView component with only one argument", () => {
    const firstLine = "firstLine";
    render(ErrorView(firstLine));
    const result = document.querySelector("div");
    const firstLineH1 = document.querySelector("div h1:nth-child(1)");

    expect(result).toBeTruthy();
    expect(firstLineH1).toBeTruthy();
    expect(firstLineH1?.innerHTML).toBe(firstLine);
  });

  it("Render ErrorView component with two arguments", () => {
    const firstLine = "firstLine";
    const secondLine = "secondLine";
    render(ErrorView(firstLine, secondLine));
    const firstLineH1 = document.querySelector("div h1:nth-child(1)");
    const secondLineH2 = document.querySelector("div h1:nth-child(2)");

    expect(firstLineH1).toBeTruthy();
    expect(firstLineH1?.innerHTML).toBe(firstLine);
    expect(secondLineH2).toBeTruthy();
    expect(secondLineH2?.innerHTML).toBe(secondLine);
  });

  it("Render ErrorView component with three arguments", () => {
    const firstLine = "firstLine";
    const secondLine = "secondLine";
    const description = "description";

    render(ErrorView(firstLine, secondLine, description));
    const firstLineH1 = document.querySelector("div h1:nth-child(1)");
    const secondLineH2 = document.querySelector("div h1:nth-child(2)");
    const descriptionP = document.querySelector("div p");

    expect(firstLineH1).toBeTruthy();
    expect(firstLineH1?.innerHTML).toBe(firstLine);
    expect(secondLineH2).toBeTruthy();
    expect(secondLineH2?.innerHTML).toBe(secondLine);
    expect(descriptionP).toBeTruthy();
    expect(descriptionP?.innerHTML).toBe(description);
  });
});
