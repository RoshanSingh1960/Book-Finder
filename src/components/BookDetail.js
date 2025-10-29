import React from 'react';
import './BookDetail.css';

function BookDetail({ book, onBack }) {
    if (!book) {
        return <p className="no-detail">Select a book to see details.</p>;
    }

    return (
        <div className="book-detail-container">
            <button onClick={onBack} className="back-button">← Back to Search Results</button>
            <div className="detail-content">
                {book.cover_i ? (
                    <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} // Larger cover for details
                        alt={book.title}
                        className="detail-book-cover"
                    />
                ) : (
                    <div className="detail-book-cover-placeholder">No Cover Available</div>
                )}
                <div className="detail-info">
                    <h2 className="detail-title">{book.title}</h2>
                    <p className="detail-author"><strong>Author(s):</strong> {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                    <p className="detail-publish-year"><strong>First Published:</strong> {book.first_publish_year || 'N/A'}</p>
                    <p className="detail-language"><strong>Language(s):</strong> {book.language ? book.language.join(', ').toUpperCase() : 'N/A'}</p>
                    {/* You can add more details here based on the API response, e.g., description, subjects */}
                    <p className="detail-description">
                        {/* The Open Library Search API provides limited description directly.
                For full descriptions, you'd typically need to fetch from the 'works' or 'editions' API separately using book.key.
                For now, let's just show a placeholder or a snippet if available.
            */}
                        <strong>Description:</strong> No detailed description available directly from search API.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;