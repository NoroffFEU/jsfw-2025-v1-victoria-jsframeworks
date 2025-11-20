import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe("Contact component", () => {
    test("Shows heading", () => {
        render(<Contact />);
        const heading = screen.getByRole('heading', { name: /contact us/i });
        expect(heading).toBeInTheDocument();
    });

    test("Shows form fields", () => {
        render(<Contact />);
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    test("Shows submit button", () => {
        render(<Contact />);
        const submitButton = screen.getByRole('button', { name: /send message/i });
        expect(submitButton).toBeInTheDocument();
    });
});