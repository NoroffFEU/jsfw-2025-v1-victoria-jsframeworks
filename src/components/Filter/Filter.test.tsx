import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Filter from './Filter';

describe("Filter", () => {
    test("Shows filter dropdown", () => {
        render(<Filter onSort={() => {}} />);
        const dropdown = screen.getByRole("combobox");
        expect(dropdown).toBeInTheDocument();
    });
});