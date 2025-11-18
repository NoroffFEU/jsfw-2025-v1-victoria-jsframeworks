import { useState, useEffect } from 'react';
import "./Filter.css";

interface FilterProps {
    onSort: (sortOption: string) => void;
}

function Filter({ onSort }: FilterProps) {
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        if (sortOption) {
            onSort(sortOption);
        }
    }, [sortOption, onSort]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    return (
        <div className="filter-container">
            <div className="filter-select-wrapper">
                <select 
                    value={sortOption} 
                    onChange={handleSortChange}
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