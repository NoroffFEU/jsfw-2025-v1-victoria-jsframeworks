import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

jest.mock("../../store/useCartStore", () => ({
    useCartStore: (selector: any) =>
        selector({
            items: [
                { id: "1", title: "Test Product", price: 20, quantity: 2, image: "img.jpg" }
            ],
            removeFromCart: jest.fn()
        })
}));

jest.mock("react-hot-toast", () => ({
    error: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    Link: ({ children }: any) => <div>{children}</div>,
}));

describe("Header Component", () => {
    test("Renders title", () => {
        render(<Header />);
        expect(screen.getByText("Online shop")).toBeInTheDocument();
    });

    test("Shows cart icon and item", () => {
        render(<Header />);

        expect(screen.getByText("🛒")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });
});
