const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const { upload, processImage } = require("../middleware/image-handler");

const bookCtrl = require("../controllers/books");

// without auth
router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestRatedBooks);
router.get("/:id", bookCtrl.getOneBook);

// with auth
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);
router.post("/", auth, upload, processImage, bookCtrl.createBook);
router.put("/:id", auth, upload, processImage, bookCtrl.modifyBook);

module.exports = router;
