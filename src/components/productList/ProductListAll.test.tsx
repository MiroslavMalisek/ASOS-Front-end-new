import { render, screen } from "@testing-library/react";
import ProductListAll from "./ProductListAll";
import {userEvent} from "@testing-library/user-event";

describe("ProductListAll component", () => {
    it("should render Register component correctly", () => {
        render(<ProductListAll />);
        const element = screen.getByRole("");
        expect(element).toBeInTheDocument()
        screen.debug();

    });

});