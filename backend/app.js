// password: aqiulPku6KhqVogX
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Book = require("./models/book");

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

app.post("/api/books", (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    ratings: req.body.ratings,
    averageRating: req.body.averageRating,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  // console.log(req.body);
  // res.status(201).json({
  //   message: "New Book has been created successfully!",
  // });
});

app.get("/api/book/:id", (req, res, next) => {
  Book.findOne({
    _id: req.params.id,
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});

app.use("/api/books", (req, res, next) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  // console.log("Books received!");
  // const book = [
  //   {
  //     id: "1",
  //     title: "Book1 title",
  //     author: "Book1 author",
  //     imageUrl:
  //       "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
  //     year: 1980,
  //     genre: "Book1 genre",
  //     ratings: [
  //       {
  //         userId: "Book1 userId",
  //         grade: 5,
  //       },
  //     ],
  //     averageRating: 8,
  //   },
  //   {
  //     id: "2",
  //     title: "Book2 title",
  //     author: "Book2 author",
  //     imageUrl:
  //       "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
  //     year: 1980,
  //     genre: "Book2 genre",
  //     ratings: [
  //       {
  //         userId: "Book2 userId",
  //         grade: 5,
  //       },
  //     ],
  //     averageRating: 8,
  //   },
  // ];
  // res.status(200).json(book);
});

// app.use((req, res, next) => {
//   console.log("Request received!");
//   next();
// });

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: "Your request was successful!" });
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Response sent successfully!");
// });

module.exports = app;
