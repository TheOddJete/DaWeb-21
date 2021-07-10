const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador');
const { ProductoRepositorio } = require('../persistencia/repository');


router.get('/registrarProducto', async (req, res) => {
    const logeado = await Controlador.getUsuarioActual();
    if (logeado !== undefined) {
        res.render('layouts/registrarProducto', { logeado });
    }
    else {
        req.flash('fallo', 'Debe iniciar sesión');
        res.redirect('/');
    }
});

router.post('/registrarProducto', async (req, res) => {
    const { nombre, descripcion, precio, categoria, estado, fecha } = req.body;
    const { filename } = req.file;
    await Controlador.crearProducto(nombre, precio, descripcion, filename, fecha, categoria, estado);
    req.flash('correcto', 'Producto registrado correctamente');
    res.redirect('/misProductos');

});

module.exports = router;