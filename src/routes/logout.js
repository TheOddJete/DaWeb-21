const express = require('express');
const Controlador = require('../controllers/Controlador')
const router = express.Router();

router.get('/logout', (req, res) => {
    Controlador.logout();
    req.flash('correcto', 'Sesión cerrada correctamente');
    res.redirect('/');
});

module.exports = router;