const express = require('express');
const router = express.Router();
const Controlador = require('../controllers/Controlador')

router.get('/buscar', async (req, res) => {
    const logeado = Controlador.getCurrentUser();
    const productos = await Controlador.searchProducts();
    res.render('layouts/buscador',{logeado,productos});
});

//FALTA HACER EL METODO PARA CONSULTAR EN LA BASE DE DATOS LOS PRODUCTOS A PARTIR DE LOS FILTROS
router.post('/filtrar', async (req, res) => {
    const { nombre, estado, precioMin, precioMax, categoria } = req.body;
    const logeado = Controlador.getCurrentUser();
    const productos = await Controlador.customSearch(nombre, estado, precioMin, precioMax, categoria);
    res.render('layouts/buscador', {logeado,productos});
});

module.exports = router;