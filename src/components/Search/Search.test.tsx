import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("Search Component", () => {
    test("Function onSearch when user types", async () => {
        const onSearch = jest.fn();
        const onClear = jest.fn();

        render(<Search onSearch={onSearch} onClear={onClear} />);

        const input = screen.getByPlaceholderText("Search products...");

        await userEvent.type(input, "product");

        expect(onSearch).toHaveBeenCalledTimes(7);
        expect(onSearch).toHaveBeenCalledWith("product");
    });

    test("Clears the search when the input is cleared", async () => {
        const onSearch = jest.fn();
        const onClear = jest.fn();

        render(<Search onSearch={onSearch} onClear={onClear} />);

        const input = screen.getByPlaceholderText("Search products...");

        await userEvent.type(input, "abc");

        await userEvent.clear(input);

        expect(onClear).toHaveBeenCalledTimes(1);
    });

    test("Updates the search input when user types", async () => {
        const onSearch = jest.fn();
        const onClear = jest.fn();

        render(<Search onSearch={onSearch} onClear={onClear} />);

        const input = screen.getByPlaceholderText("Search products...");

        await userEvent.type(input, "red");

        expect(input).toHaveValue("red");
    });
});