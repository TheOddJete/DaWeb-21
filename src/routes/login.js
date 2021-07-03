const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;
    const newUsuario = {

    }
});

module.exports = router;