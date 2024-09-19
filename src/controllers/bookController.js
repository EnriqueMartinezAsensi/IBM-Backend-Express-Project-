let books = [
  {
    isbn: 1,
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    reviews: [],
  },
  {
    isbn: 2,
    title: "1984",
    author: "George Orwell",
    reviews: [],
  },
  {
    isbn: 3,
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    reviews: [],
  },
  {
    isbn: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    reviews: [],
  },
  {
    isbn: 5,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    reviews: [],
  },
  {
    isbn: 6,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    reviews: [],
  },
  {
    isbn: 7,
    title: "Ulysses",
    author: "James Joyce",
    reviews: [],
  },
  {
    isbn: 8,
    title: "In Search of Lost Time",
    author: "Marcel Proust",
    reviews: [],
  },
  {
    isbn: 9,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    reviews: [],
  },
  {
    isbn: 10,
    title: "The Odyssey",
    author: "Homer",
    reviews: [],
  },
];

const getBooks = (req, res) => {
  const { isbn, author, title } = req.params;
  if (isbn) {
    const book = books.find((book) => book.isbn === Number(isbn));
    if (book) res.json(book);
    else res.status(404).json({ message: "ISBN not found" });
  } else if (author) {
    const book = books.filter((book) => book.author.includes(author));
    if (book) res.json(book);
    else res.status(404).json({ message: "Author not found" });
  } else if (title) {
    const book = books.find((book) => book.title.includes(title));
    if (book) res.json(book);
    else res.status(404).json({ message: "Title not found" });
  } else res.json(books);
};

const getBookReviews = (req, res) => {
  const isbn = req.params.isbn;
  const data = books.find((book) => book.isbn === Number(isbn));
  res.json(data.reviews);
};

const addReview = (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const user = req.user.username;
  const book = books.find((book) => book.isbn === Number(isbn));

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  if (user && !book.reviews.find(({ username }) => username === user)) {
    book.reviews.push({ username: user, review: review });
    return res.json({ message: "Review added." });
  } else {
    return res.status(403).json({ message: "Review already added." });
  }
};

const modifyReview = (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const user = req.user.username;
  const book = books.find((book) => book.isbn === Number(isbn));

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  if (user && book.reviews.find(({ username }) => username === user)) {
    book.reviews = book.reviews
    .filter(({ username }) => username !== user)
    .concat({ username: user, review: review });
    return res.json({ message: "Review modified." });
  } else {
    return res.status(403).json({ message: "No previous review found." });
  }
};

const deleteReview = (req, res) => {
  const isbn = req.params.isbn;
  const user = req.user.username;
  const book = books.find((book) => book.isbn === Number(isbn));

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  if (user && book.reviews.find(({ username }) => username === user)) {
    book.reviews = book.reviews.filter(({ username }) => username !== user);
    return res.json({ message: "Review deleted." });
  } else {
    return res.status(403).json({ message: "No previous review found." });
  }
};

module.exports = { getBooks, getBookReviews, addReview, modifyReview, deleteReview };
