const express = require('express');
const Controlador = require('../controllers/Controlador')
const router = express.Router();

router.get('/logout', (req, res) => {
    Controlador.logout();
    res.redirect('/');
});

module.exports = router;