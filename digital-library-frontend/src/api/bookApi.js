import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/books`;

const bookApi = {  
  getAllBooks: async () => {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  },

  getBookById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  getBookByTitle: async (title) => {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { title }
    });
    return response.data;
  },

  addBook: async (book) => {
    const response = await axios.post(`${API_BASE_URL}/add`, book);
    return response.data;
  },

  updateBook: async (id, book) => {
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, book);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data;
  }
};

export default bookApi; 