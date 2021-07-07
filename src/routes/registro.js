const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador');

router.get('/registro', (req, res) => {
    res.render('auth/registro');
});

router.post('/registro', async (req, res) => {
    const { nombre, apellidos, usuario, contrasena, recontrasena, email, credito, provincia } = req.body;

    if (contrasena == recontrasena) {
        const ok = await Controlador.createUsuario(nombre, apellidos, usuario, contrasena, email,credito, provincia);
        
        if(ok){
            req.flash('correcto', 'Registro realizado correctamente');
            res.redirect('/');
        }
        else{
            req.flash('fallo', 'El usuario ya existe');
            res.redirect('/registro');
        }
    }
    else{
        req.flash('fallo', 'Las contraseñas no coinciden');
        res.redirect('/perfil');
    }
});

module.exports = router;