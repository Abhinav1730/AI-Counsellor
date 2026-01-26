const express = require('express');
const router = express.Router();

// Mock database
let profiles = {};

router.post('/', (req, res) => {
  const { userId, data } = req.body;
  profiles[userId] = data;
  res.json({ success: true, message: 'Profile updated' });
});

router.get('/:userId', (req, res) => {
  res.json(profiles[req.params.userId] || {});
});

module.exports = router;
