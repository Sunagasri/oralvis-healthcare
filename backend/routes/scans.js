const express = require('express');
const multer = require('multer');
const { auth, authorize } = require('../middleware/auth');
const db = require('../config/database');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload scan - Technician only
router.post('/', auth, authorize('technician'), upload.single('image'), (req, res) => {
  try {
    const { patient_name, patient_id, scan_type, region } = req.body;
    const image_url = req.file.path;
    
    db.run(
      `INSERT INTO scans (patient_name, patient_id, scan_type, region, image_url, uploaded_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [patient_name, patient_id, scan_type, region, image_url, req.user.id],
      function(err) {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'Scan uploaded successfully', id: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all scans - Dentist only
router.get('/', auth, authorize('dentist'), (req, res) => {
  db.all(
    `SELECT scans.*, users.email as uploaded_by_email 
     FROM scans 
     JOIN users ON scans.uploaded_by = users.id 
     ORDER BY upload_date DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(rows);
    }
  );
});

module.exports = router;