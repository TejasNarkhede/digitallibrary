import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import bookApi from '../api/bookApi';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchBooks = async () => {
    try {
      const data = await bookApi.getAllBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult(null);
      fetchBooks(); // Refresh the book list when search is cleared
      return;
    }

    try {
      let result;
      if (searchType === 'title') {
        result = await bookApi.getBookByTitle(searchQuery);
      } else {
        const id = parseInt(searchQuery);
        if (isNaN(id)) {
          setError('Please enter a valid ID number');
          return;
        }
        result = await bookApi.getBookById(id);
      }
      setSearchResult(result);
      setError(null);
    } catch (err) {
      setError('Book not found. Please try a different search.');
      setSearchResult(null);
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      const newBook = await bookApi.addBook(bookData);
      setBooks(prev => [...prev, newBook]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add book. Please try again.');
    }
  };

  const handleEditBook = async (bookData) => {
    try {
      const updatedBook = await bookApi.updateBook(editingBook.id, bookData);
      setBooks(prev => prev.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      ));
      setEditingBook(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to update book. Please try again.');
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookApi.deleteBook(id);
        setBooks(prev => prev.filter(book => book.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete book. Please try again.');
      }
    }
  };

  const handleFormSubmit = (bookData) => {
    if (editingBook) {
      handleEditBook(bookData);
    } else {
      handleAddBook(bookData);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
    fetchBooks();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="book-list-page">
      <div className="page-header">
        <h1>Digital Library</h1>
        <button 
          className="add-book-btn"
          onClick={() => {
            setEditingBook(null);
            setShowForm(true);
          }}
        >
          Add New Book
        </button>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-inputs">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="search-type-select"
            >
              <option value="title">Search by Title</option>
              <option value="id">Search by ID</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchType === 'title' ? 'Enter book title...' : 'Enter book ID...'}
              className="search-input"
            />
            <button type="submit" className="search-btn">Search</button>
            {searchResult && (
              <button 
                type="button" 
                onClick={handleClearSearch}
                className="clear-search-btn"
              >
                Clear Search
              </button>
            )}
          </div>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
            <BookForm
              book={editingBook}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingBook(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="books-grid">
        {searchResult ? (
          <BookCard
            key={searchResult.id}
            book={searchResult}
            onEdit={(book) => {
              setEditingBook(book);
              setShowForm(true);
            }}
            onDelete={handleDeleteBook}
          />
        ) : (
          books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={(book) => {
                setEditingBook(book);
                setShowForm(true);
              }}
              onDelete={handleDeleteBook}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;