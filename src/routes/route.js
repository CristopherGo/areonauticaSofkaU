const express = require('express');
const controller = require('../controllers/controller');//funciones de cada peticion
const router = express.Router();

//administrador de peticiones al servidor de tipo GET Y POST
//con router a cada peticion se asigna una accion 
router.get('/crear', (req, res) => { res.render('./activites/crear') });
router.get('/buscar',  (req, res) => { res.render('./activites/buscar') });

router.post('/mostrar_simple', controller.busquedaSimple);
router.post('/mostrar_avanzado', controller.busquedaAvanzada);
router.post('/crear/guardar', controller.validar)
module.exports = router;