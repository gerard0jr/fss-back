const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

module.exports = router;
