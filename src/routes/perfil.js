const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/perfil', async (req, res) => {
    const logeado = await Controlador.getCurrentUser();
    res.render('layouts/perfil',{logeado});
});

//FALTA HACER EL METODO PARA ACTUALIZAR LA INFORMACION DEL USUARIO
router.post('/perfil', async (req, res) => {
    console.log(req.body);
    const { nombre, apellidos, usuario, contrasena, recontrasena, email, credito, provincia } = req.body;

    if (contrasena == recontrasena) {
        const ok = await Controlador.updateUsuario(nombre, apellidos, contrasena, email, credito, provincia);
        res.redirect('/');
    }
});

module.exports = router;