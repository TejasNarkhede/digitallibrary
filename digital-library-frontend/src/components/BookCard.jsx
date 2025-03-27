import React from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="book-card">
      <div className="book-info">
        <div className="book-id">ID: {book.id}</div>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">By {book.author}</p>
        <p className="book-genre">{book.genre}</p>
        <span className={`book-status ${book.status.toLowerCase()}`}>
          {book.status}
        </span>
      </div>
      <div className="book-actions">
        <button onClick={() => onEdit(book)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(book.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string,
    status: PropTypes.oneOf(['AVAILABLE', 'CHECKED_OUT']).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookCard; 