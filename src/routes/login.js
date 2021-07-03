const express = require('express');
const Controlador = require('../controllers/Controlador')
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;
    const ok = await Controlador.login(usuario, contrasena);
    if (ok !== undefined) {
        //res.json({ type: 'ok', alerta: { tipo: 'alert-danger', msg: 'Credenciales inválidas' } });
        res.send("Correcto");
    }
    else {
        //res.json({ type: 'fail', alerta: { tipo: 'alert-danger', msg: 'Credenciales inválidas' } });
        res.send("Falla");
    }
});

module.exports = router;