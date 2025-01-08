const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://randtest:aqiulPku6KhqVogX@cluster0.whnuo.mongodb.net/"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
// app.use("/api/books", bookRoutes);
// app.use("/api/auth", userRoutes);

// To test the hardcoded added books
app.use("/api/books", (req, res, next) => {
  console.log("Books received!");
  const book = [
    {
      id: "1",
      title: "Book1 title",
      author: "Book1 author",
      imageUrl:
        "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
      year: 1980,
      genre: "Book1 genre",
      ratings: [
        {
          userId: "Book1 userId",
          grade: 5,
        },
      ],
      averageRating: 8,
    },
    {
      id: "2",
      title: "Book2 title",
      author: "Book2 author",
      imageUrl:
        "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
      year: 1980,
      genre: "Book2 genre",
      ratings: [
        {
          userId: "Book2 userId",
          grade: 5,
        },
      ],
      averageRating: 8,
    },
  ];
  res.status(200).json(book);
});
module.exports = app;
