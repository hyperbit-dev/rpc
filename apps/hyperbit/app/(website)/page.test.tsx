import { render, screen } from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("should render the page", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Mastering the Future:/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
