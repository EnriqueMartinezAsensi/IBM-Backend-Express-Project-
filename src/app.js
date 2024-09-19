const express = require("express");
const session = require("express-session");
const { userRouter } = require("./routes/userRouter");
const { bookRouter } = require("./routes/bookRouter");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "fingerpint",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/user", userRouter);
app.use("/books", bookRouter);

const PORT = 5000;

app.listen(PORT, () => console.log("Server is running"));