const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/user.controller');
const { esRoleValido, isEmailValid, existeUsuarioPorId} = require('../helpers/db-validators');

/*const {validarCampos} = require('../middlewares/validar-campos');
const  {validarJWT} = require('../middlewares/validar-jwt');
const { esAdminrole, tieneRol } = require('../middlewares/validar-roles');*/
//Importamos los middleware de nuesto indexjs, de esta manera mas simple, para evitar multiples imports de esta direccion
const {validarCampos, validarJWT, esAdminrole, tieneRol}  = require('../middlewares')


const router = Router();


router.get('/',  usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut);

router.post('/', [
    //Esto voiene de express validator js
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo ingresado no es valido').isEmail(),
    check('correo').custom(isEmailValid),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPost);

router.delete('/:id', [
    validarJWT,
    //esAdminrole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete);

router.patch('/',  usuarioPatch);


module.exports = router;