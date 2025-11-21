import { useState } from 'react';
import "./Filter.css";

interface FilterProps {
    onSort: (sortOption: string) => void;
}

/* Dropdown that lets the user sort products by name, price or rating */
function Filter({ onSort }: FilterProps) {
    const [sortOption] = useState('');

    return (
        <div className="filter-container">
            <div className="filter-select-wrapper">
                <select 
                    value={sortOption} 
                    onChange={(e) => onSort(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Sort by...</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="rating-desc">Rating (High to Low)</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;