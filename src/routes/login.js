const express = require('express');
const Controlador = require('../controllers/Controlador')
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;
    const ok = await Controlador.login(usuario, contrasena);
    if (ok !== undefined) {
        req.flash('correcto', 'Inicio de sesión correcto');
        res.redirect('/');
    }
    else {
        req.flash('fallo', 'Datos introducidos incorrectos');
        res.redirect('/login');
    }
});

module.exports = router;