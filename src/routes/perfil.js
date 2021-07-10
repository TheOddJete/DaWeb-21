const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/perfil', async (req, res) => {
    const logeado = await Controlador.getCurrentUser();
    if (logeado !== undefined){
        res.render('layouts/perfil',{logeado});
    }
    else{
        req.flash('fallo', 'Debe iniciar sesión');
        res.redirect('/');
    }
    
});

router.post('/perfil', async (req, res) => {
    const { nombre, apellidos, usuario, contrasena, recontrasena, email, credito, provincia } = req.body;

    if (contrasena == recontrasena) {
        const ok = await Controlador.updateUsuario(nombre, apellidos, contrasena, email, credito, provincia);
        if(ok){
            req.flash('correcto', 'Usuario actualizado correctamente');
            res.redirect('/');
        }
        else {
            req.flash('fallo', 'No se ha podido actualizar el usuario');
            res.redirect('/perfil');
        }
    }
    else{
        req.flash('fallo', 'Las contraseñas no coinciden');
        res.redirect('/perfil');
    }
});

module.exports = router;