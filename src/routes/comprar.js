const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.post('/comprar', async (req, res) => {
    const { id } = req.body;
    const logeado = Controlador.getCurrentUser();
    var productoComprado = await Controlador.comprarProducto(id, logeado);
    if(productoComprado){
        req.flash('correcto', 'Producto comprado correctamente');
        res.redirect('/buscar');
    }
    else{
        res.redirect('/buscar');
    }
});

module.exports = router;