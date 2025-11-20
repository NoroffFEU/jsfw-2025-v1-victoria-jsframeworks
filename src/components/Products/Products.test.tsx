import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Products from "./Products";

describe("Products", () => {
    test("Renders product list", () => {
        render(
        <MemoryRouter>
            <Products />
        </MemoryRouter>
        );
    });
});