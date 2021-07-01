const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('users/singin');
});

module.exports = router;