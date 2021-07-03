const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/buscar', (req, res) => {
    res.render('layouts/buscador');
});

//FALTA HACER EL METODO PARA CONSULTAR EN LA BASE DE DATOS LOS PRODUCTOS A PARTIR DE LOS FILTROS
router.post('/post', async (req, res) => {
    console.log(req.body);
    const { nombre, apellidos, usuario, contrasena, recontrasena, email, credito, provincia } = req.body;

    if (contrasena == recontrasena) {
        const ok = await Controlador.createUsuario(nombre, apellidos, usuario, contrasena, email,credito, provincia);
        res.render('index');
    }
});

module.exports = router;