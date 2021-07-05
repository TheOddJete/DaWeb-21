const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/cambiar', async (req, res) => {
    console.log(req.query);
    const { id } = req.query;

    const producto = await Controlador.getProductById(id);
    const productos = await Controlador.searchCurrentUserProducts();

    res.render('products/change', { producto, productos });
});
router.post('/cambiar', async (req, res) => {
    const { id } = req.body;
    console.log("BODY ", id);
    const logeado = Controlador.getCurrentUser();
    var productoComprado = await Controlador.comprarProducto(id, logeado);
    if(productoComprado){
        res.redirect('/buscar');

    }
    else
        res.send("FAIL");
});

module.exports = router;