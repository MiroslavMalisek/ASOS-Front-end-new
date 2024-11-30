import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./SimpleButton";

describe("Button component", () => {
  it("renders the button with the correct label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const button = screen.getByText("Click Me");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
