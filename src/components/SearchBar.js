import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [searchBy, setSearchBy] = useState('title'); // Default search by title

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query, searchBy);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar-container">
            <div className="search-input-group">
                <input
                    type="text"
                    placeholder="Search for books, authors, or subjects..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </div>
            <div className="search-options">
                <label>
                    <input
                        type="radio"
                        value="title"
                        checked={searchBy === 'title'}
                        onChange={(e) => setSearchBy(e.target.value)}
                    />
                    Title
                </label>
                <label>
                    <input
                        type="radio"
                        value="author"
                        checked={searchBy === 'author'}
                        onChange={(e) => setSearchBy(e.target.value)}
                    />
                    Author
                </label>
                <label>
                    <input
                        type="radio"
                        value="subject"
                        checked={searchBy === 'subject'}
                        onChange={(e) => setSearchBy(e.target.value)}
                    />
                    Subject
                </label>
            </div>
        </form>
    );
}

export default SearchBar;