const { getAllBooks, getBookByISBN, getBookByAuthor, getBookByTitle } = require("./getBooks");

const callAllFuntions = async() => {
  try {
    const allBooks = await getAllBooks();
    console.log(`Using Async/await, all books: ${JSON.stringify(allBooks.data)}`);

    getBookByISBN(1).then((data) => console.log(`Using Promises, by ISBN: ${JSON.stringify({data})}`));

    getBookByAuthor("George Orwell").then((data) => console.log(`Using Promises, by Author: ${JSON.stringify({data})}`));

    getBookByTitle("Don Quixote").then((data) => console.log(`Using Promises, by Title: ${JSON.stringify({data})}`));

  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

callAllFuntions();