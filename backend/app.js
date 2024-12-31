const express = require("express");

const app = express();

app.use(express.json());

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

app.post("/api/books", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "New Book has been created successfully!",
  });
});

app.get("/api/books", (req, res, next) => {
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
