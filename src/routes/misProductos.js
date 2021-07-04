const express = require('express');
const Controlador = require('../controllers/Controlador')
const router = express.Router();

router.get('/misProductos', async (req, res) => {
    const logeado = await Controlador.getCurrentUser();
    const productos = await Controlador.searchCurrentUserProducts();
    res.render('layouts/misProductos',{logeado,productos});
});

module.exports = router;