import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

interface SearchBarProps {
    onSearch: (query: string) => void; // Callback function prop
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery); // Call the onSearch prop with the query
            //setSearchQuery(''); // Clear the input after search
        }
    };

    return (
        <Form id="search-bar-form" className="d-flex ms-5 me-5" onSubmit={(e) => {
            e.preventDefault();
            handleSearch(); // Trigger search on form submit (Enter key)
        }}>
            <FormControl
                id="search-bar"
                type="search"
                placeholder="Vyhľadajte produkt"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            />
            <Button variant="secondary" className="search-button" onClick={handleSearch}>Hľadať</Button>
        </Form>
    );
};

export default SearchBar;