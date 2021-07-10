const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/cambiar', async (req, res) => {
    const { id } = req.query;

    const logeado = Controlador.getUsuarioActual();
    const producto = await Controlador.getProductoById(id);
    const productos = await Controlador.buscarProductosUsuarioActual();

    res.render('layouts/cambiarProducto', { producto, productos, logeado });
});
router.post('/cambiar', async (req, res) => {
    const { productId, product_change } = req.body;
    const resultado = await Controlador.cambiarProducto(productId, product_change);
    if(resultado){
        req.flash('correcto', 'Producto cambiado correctamente');
        res.redirect('/buscar');
    }
    else{
        req.flash('fallo', 'El importe del producto seleccionado debe ser igual o mayor');
        res.redirect('/buscar');
    } 
});

module.exports = router;