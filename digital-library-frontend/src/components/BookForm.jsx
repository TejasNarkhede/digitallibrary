import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    status: 'AVAILABLE'
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="AVAILABLE">Available</option>
          <option value="CHECKED_OUT">Checked Out</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {book ? 'Update Book' : 'Add Book'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

BookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    genre: PropTypes.string,
    status: PropTypes.oneOf(['AVAILABLE', 'CHECKED_OUT'])
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default BookForm;
