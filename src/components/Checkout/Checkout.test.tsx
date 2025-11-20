import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkout from "./Checkout";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));

let mockState: any = {
    items: [],
    increaseQty: jest.fn(),
    decreaseQty: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    setLastOrderItemCount: jest.fn(),
    setCheckoutSuccess: jest.fn(),
};

jest.mock("../../store/useCartStore", () => ({
    useCartStore: (selector: any) => selector(mockState),
}));

const mockToast = { error: jest.fn() };
jest.mock("react-hot-toast", () => ({ toast: mockToast }));

describe("Checkout", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockState.items = [];
        mockState.increaseQty.mockClear();
        mockState.decreaseQty.mockClear();
        mockState.removeFromCart.mockClear();
        mockState.clearCart.mockClear();
        mockState.setLastOrderItemCount.mockClear();
        mockState.setCheckoutSuccess.mockClear();
        mockToast.error.mockClear();
    });

    test("Shows empty cart and keep shopping button", () => {
        render(<Checkout />);
        expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
        const keepBtn = screen.getByRole("button", { name: /keep shopping/i });
        expect(keepBtn).toBeInTheDocument();
    });

    test("Shows the item cart and products when the user had products in cart", () => {
        mockState.items = [
        { id: "1", title: "Product A", price: 10, image: "img.png", quantity: 2 },
        ];

        render(<Checkout />);
        expect(screen.getByText(/Product A/i)).toBeInTheDocument();
        expect(screen.getByText(/\$10/i)).toBeInTheDocument();
        const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
        expect(checkoutBtn).toBeInTheDocument();
        expect(screen.getByText(/Total: \$20.00/)).toBeInTheDocument();
    });

    test("Clicking checkout button takes the user to success page", () => {
        mockState.items = [
        { id: "1", title: "Product A", price: 5, image: "img.png", quantity: 3 },
        ];

        render(<Checkout />);
        const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
        fireEvent.click(checkoutBtn);

        expect(mockState.setLastOrderItemCount).toHaveBeenCalledWith(3);
        expect(mockState.clearCart).toHaveBeenCalled();
        expect(mockState.setCheckoutSuccess).toHaveBeenCalledWith(true);
        expect(mockNavigate).toHaveBeenCalledWith("/success", { state: { fromCheckout: true } });
    });
});