const express = require('express');
const Controlador = require('../controllers/Controlador')
const router = express.Router();

router.get('/misProductos', async (req, res) => {
    const logeado = await Controlador.getCurrentUser();
    if (logeado !== undefined) {
        const productos = await Controlador.searchCurrentUserProducts();
        res.render('layouts/misProductos', { logeado, productos });
    }
    else {
        req.flash('fallo', 'Deber iniciar la sesión');
        res.redirect('/');
    }
});

module.exports = router;