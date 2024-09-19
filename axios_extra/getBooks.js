const  axios = require("axios");

const URL = "http://localhost:5000";

const getAllBooks = async () => {
  const result = await axios.get(`${URL}/books/`);
  return result;
};

const getBookByISBN = async (isbn) => {
  return axios.get(`${URL}/books/isbn/${isbn}`).then(({ data }) => data);
};

const getBookByAuthor = async (author) => {
  return axios.get(`${URL}/books/author/${author}`).then(({ data }) => data);
};
const getBookByTitle = async (title) => {
  return axios.get(`${URL}/books/title/${title}`).then(({ data }) => data);
};

module.exports = { getAllBooks, getBookByISBN, getBookByAuthor, getBookByTitle };