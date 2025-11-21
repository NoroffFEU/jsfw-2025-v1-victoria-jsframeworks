import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Success from "./Success";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-hot-toast";

const mockState = {
    checkoutSuccess: false,
    lastOrderItemCount: 0
};

jest.mock("../../store/useCartStore", () => ({
    useCartStore: (selector: any) => selector(mockState),
}));

jest.mock("react-hot-toast", () => ({
    toast: {
        success: jest.fn(),
    },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Success Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Redirects to home if the cart is empty", async () => {
        mockState.checkoutSuccess = false;
        mockState.lastOrderItemCount = 0;

        render(
            <MemoryRouter>
                <Success />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    test("Shows success text and toast notifications when checkout is successful", async () => {
        mockState.checkoutSuccess = true;
        mockState.lastOrderItemCount = 2;

        render(
            <MemoryRouter>
                <Success />
            </MemoryRouter>
        );

        expect(screen.getByText("Order Successful!")).toBeInTheDocument();

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Checkout successful!");
        });
    });
});