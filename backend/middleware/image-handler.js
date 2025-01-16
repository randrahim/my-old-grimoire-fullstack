const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const storage = multer.memoryStorage(); // Store file in memory temporarily
const upload = multer({ storage }).single("image");

const processImage = async (req, res, next) => {
  if (!req.file) {
    return next(); // Skip if no file is uploaded
  }

  const outputFilename = `compressed-${Date.now()}.jpeg`;
  const outputPath = path.join(__dirname, "../images", outputFilename);

  try {
    await sharp(req.file.buffer)
      .resize(800) // Resize image to 800px width
      .jpeg({ quality: 80 }) // Compress to JPEG with 80% quality
      .toFile(outputPath);

    req.file.filename = outputFilename; // Update filename
    req.file.path = outputPath; // Add file path for later use
    next();
  } catch (error) {
    console.error("Image processing error:", error.message);
    res
      .status(500)
      .json({ error: "Image processing failed", details: error.message });
  }
};

module.exports = { upload, processImage };
