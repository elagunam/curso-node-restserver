const {Router} = require('express');
const { usuariosGet, usuariosPut, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/user.controller');

const router = Router();


router.get('/',  usuariosGet);

router.put('/:id', usuariosPut);

router.post('/',  usuarioPost);

router.delete('/',  usuarioDelete);

router.patch('/',  usuarioPatch);


module.exports = router;