const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/cambiar', async (req, res) => {
    console.log(req.query);
    const { id } = req.query;

    const producto = await Controlador.getProductById(id);
    const productos = await Controlador.searchCurrentUserProducts();

    res.render('layouts/cambiarProducto', { producto, productos });
});
router.post('/cambiar', async (req, res) => {
    const { productId, product_change } = req.body;
    const resultado = await Controlador.changeProducts(productId, product_change);
    if(resultado){
        res.redirect('/buscar');
    }
    else res.send('Error');
});

module.exports = router;