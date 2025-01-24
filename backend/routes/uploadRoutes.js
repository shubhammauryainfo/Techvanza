const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Set up local storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});

// Initialize multer with the local storage configuration
const upload = multer({ storage });

// Create the upload endpoint
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }

  // Send back the filename as a response
  res.status(200).send({ filename: req.file.filename });


});

// Create the delete endpoint
router.delete('/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', filename); // Adjust path as needed

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send({ message: 'File not found.' });
    }

    // Delete the file
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('File deletion error:', unlinkErr);
        return res.status(500).send({ message: 'Failed to delete file.' });
      }

      res.status(200).send({ message: 'File deleted successfully.' });
    });
  });
});

module.exports = router;