const express = require('express');
const upload = require('../middleware/upload');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/upload/image
// @desc    Upload image file
// @access  Private
router.post('/image', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      url: imageUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/upload/document
// @desc    Upload document file
// @access  Private
router.post('/document', authMiddleware, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const documentUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      message: 'Document uploaded successfully',
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      url: documentUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple files
// @access  Private
router.post('/multiple', authMiddleware, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));
    
    res.json({
      message: `${req.files.length} files uploaded successfully`,
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
