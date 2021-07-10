const express = require('express');
const Controlador = require('../controllers/Controlador')
const router = express.Router();

router.get('/misProductos', async (req, res) => {
    const logeado = await Controlador.getUsuarioActual();
    if (logeado !== undefined) {
        const productos = await Controlador.buscarProductosUsuarioActual();
        res.render('layouts/misProductos', { logeado, productos });
    }
    else {
        req.flash('fallo', 'Debe iniciar sesión');
        res.redirect('/');
    }
});

router.post('/misProductos', async (req, res) => {
    const { id } = req.body;
    console.log(id);
    await Controlador.borrarProducto(id);
    req.flash('correcto', 'Producto borrado correctamente');
    res.redirect('/misProductos');
});

module.exports = router;