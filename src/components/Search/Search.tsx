import { useState } from 'react';
import "./Search.css";

interface SearchProps {
    onSearch: (searchTerm: string) => void;
    onClear: () => void;
}

/* Search component that filters products as the user types */
function Search({ onSearch, onClear }: SearchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        /* Clears input when user removes text */
        if (value === '') {
            onClear();
        } else {
            onSearch(value);
        }
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="search-input"
                />
            </div>
        </div>
    );
}

export default Search;