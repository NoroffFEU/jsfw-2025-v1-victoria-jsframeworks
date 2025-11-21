import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import IndividualProduct from "./IndividualProduct";

jest.mock("react-router-dom", () => ({
    useParams: () => ({ id: "1" }),
}));

global.fetch = jest.fn();

describe("IndividualProduct", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Shows loading spinner", () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({})
        });

        render(<IndividualProduct />);

        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    test("Shows error message", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        });

        render(<IndividualProduct />);

        expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    });

    test("Shows products", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            data: {
            id: "1",
            title: "Test Product",
            description: "A product",
            price: 100,
            image: { url: "img.jpg", alt: "alt text" },
            }
        }),
        });

        render(<IndividualProduct />);

        expect(await screen.findByText("Test Product")).toBeInTheDocument();
    });
});