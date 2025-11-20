import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
    test("Shows copyright text", () => {
        render(<Footer />);

        expect(screen.getByText("2024 Online Shop. All rights reserved.")).toBeInTheDocument();
    });
})