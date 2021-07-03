const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/perfil', (req, res) => {
    res.render('layouts/perfil');
});

//FALTA HACER EL METODO PARA ACTUALIZAR LA INFORMACION DEL USUARIO
router.post('/post', async (req, res) => {
    console.log(req.body);
    const { nombre, apellidos, usuario, contrasena, recontrasena, email, credito, provincia } = req.body;

    if (contrasena == recontrasena) {
        const ok = await Controlador.createUsuario(nombre, apellidos, usuario, contrasena, email,credito, provincia);
        res.render('index');
    }
});

module.exports = router;