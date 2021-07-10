const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/buscar', async (req, res) => {
    const logeado = Controlador.getUsuarioActual();
    if (logeado !== undefined) {
        const productos = await Controlador.buscarProductos();
        res.render('layouts/buscador', { logeado, productos });
    }
    else {
        req.flash('fallo', 'Debe iniciar sesión');
        res.redirect('/');
    }
});

router.post('/filtrar', async (req, res) => {
    const { nombre, estado, precioMin, precioMax, categoria } = req.body;
    const logeado = Controlador.getUsuarioActual();
    const productos = await Controlador.buscarConFiltro(nombre, estado, precioMin, precioMax, categoria);
    res.render('layouts/buscador', { logeado, productos });
});

module.exports = router;