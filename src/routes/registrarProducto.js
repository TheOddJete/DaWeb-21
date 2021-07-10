const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador');
const { ProductoRepositorio } = require('../persistencia/repository');


router.get('/registrarProducto', async (req, res) => {
    const logeado = await Controlador.getCurrentUser();
    if (logeado !== undefined){
        res.render('layouts/registrarProducto',{logeado});
    }
    else{
        req.flash('fallo', 'Debe iniciar sesión');
        res.redirect('/');
    }
});

router.post('/registrarProducto', async (req, res) => {
    const { nombre, descripcion, precio, categoria, estado, fecha } = req.body;
    const { filename } = req.file;
    await Controlador.createProduct(nombre, precio, descripcion, filename, fecha, categoria, estado);
    res.redirect('/');
});

module.exports = router;