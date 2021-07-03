const express = require('express');
const pool = require('../persistencia/database');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/registro', (req, res) => {
    res.render('auth/registro');
});

router.post('/registro', async (req, res) => {
    console.log(req.body);
    const { nombre, apellidos, usuario, contrasena, recontrasena, email, credito, provincia } = req.body;

    if (contrasena == recontrasena) {
        const ok = await Controlador.createUsuario(nombre, apellidos, usuario, contrasena, email,credito, provincia);
        res.render('index');
    }
});

module.exports = router;