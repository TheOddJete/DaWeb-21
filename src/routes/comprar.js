const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.post('/comprar', async (req, res) => {
    const { id } = req.body;
    console.log("QUERY ", id);
    const logeado = Controlador.getCurrentUser();
    var productoComprado = await Controlador.comprarProducto(id, logeado);
    if(productoComprado){
        res.redirect('/buscar');

    }
    else
        res.send("FAIL");
});

module.exports = router;