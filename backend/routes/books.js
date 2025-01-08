const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const bookCtrl = require("../controllers/books");
const Book = require("../models/book");

router.get("/", auth, bookCtrl.getAllBooks);
router.post("/", auth, bookCtrl.createBook);
router.get("/:id", auth, bookCtrl.getOneBook);
router.put("/:id", auth, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
