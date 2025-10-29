import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import './App.css'; // For global styles

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query, searchBy) => {
    setLoading(true);
    setError(null);
    setSelectedBook(null); // Clear selected book on new search
    setBooks([]); // Clear previous search results

    let apiUrl = `https://openlibrary.org/search.json?`;
    if (searchBy === 'title') {
      apiUrl += `title=${encodeURIComponent(query)}`;
    } else if (searchBy === 'author') {
      apiUrl += `author=${encodeURIComponent(query)}`;
    } else if (searchBy === 'subject') {
      apiUrl += `subject=${encodeURIComponent(query)}`;
    } else {
      apiUrl += `q=${encodeURIComponent(query)}`; // Default general search
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data.docs);
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
      console.error("Fetch error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Book Finder</h1>
        <p>Discover your next read!</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="message">Searching for books...</p>}
        {error && <p className="message error">{error}</p>}

        {books.length > 0 && !selectedBook && (
          <BookList books={books} onBookSelect={handleBookSelect} />
        )}
        {books.length === 0 && !loading && !error && !selectedBook && (
          <p className="message">Start by searching for a book above!</p>
        )}

        {selectedBook && (
          <BookDetail book={selectedBook} onBack={() => setSelectedBook(null)} />
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Book Finder. Powered by Open Library API.</p>
      </footer>
    </div>
  );
}

export default App;