const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/registrarProducto', (req, res) => {
    res.render('layouts/registrarProducto');
});

//FALTA HACER EL METODO PARA GUARDARLO EN LA BASE DE DATOS
router.post('/post', async (req, res) => {
    console.log(req.body);
    const { nombre, apellidos, usuario, contrasena, recontrasena, email, credito, provincia } = req.body;

    if (contrasena == recontrasena) {
        const ok = await Controlador.createUsuario(nombre, apellidos, usuario, contrasena, email,credito, provincia);
        res.render('index');
    }
});

module.exports = router;