const express = require('express');
const Controlador = require('../controllers/Controlador');
const router = express.Router();

router.get('/', async (req, res) => {
    const logeado = await Controlador.getCurrentUser();
    res.render('index', {logeado});

});

module.exports = router;