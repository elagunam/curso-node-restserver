const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    //VALIDAR CAMPOS MANDA LOS ERRORES DE LOS MIDDLEWARES
    validarCampos
], login);


router.post('/google', [
    check('id_token', 'El id token es obligatorio').not().isEmpty(),
    //VALIDAR CAMPOS MANDA LOS ERRORES DE LOS MIDDLEWARES
    validarCampos
], googleSignin);

module.exports = router;