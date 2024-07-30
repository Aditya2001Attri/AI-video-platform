const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route for file upload
app.post('/api/videos/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
