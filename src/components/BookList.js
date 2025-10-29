import React from 'react';
import './BookList.css';

function BookList({ books, onBookSelect }) {
    if (!books || books.length === 0) {
        return <p className="no-results">No books found. Try a different search!</p>;
    }

    return (
        <div className="book-list-container">
            {books.map((book) => (
                <div key={book.key} className="book-card" onClick={() => onBookSelect(book)}>
                    {book.cover_i ? (
                        <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                            alt={book.title}
                            className="book-cover"
                        />
                    ) : (
                        <div className="book-cover-placeholder">No Cover</div>
                    )}
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                </div>
            ))}
        </div>
    );
}

export default BookList;