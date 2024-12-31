const express = require("express");

const app = express();

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

app.use("/api/books", (req, res, next) => {
  console.log("Books received!");
  const book = [
    {
      id: "1",
      title: "Book1 title",
      author: "Book1 author",
      imageUrl: "Book1 imageUrl",
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
      imageUrl: "Book2 imageUrl",
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
