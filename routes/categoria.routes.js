const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { existeCategoria } = require('../helpers/db-validators');
const {validarJWT, validarCampos, esAdminrole} = require('../middlewares/');


const router = Router();
//OBTENER TODAS LAS CATEGORIAS - PUBLICO
router.get('/', obtenerCategorias);

////OBTENER una CATEGORIA por id - PUBLICO
//HACER MIDDLEWARE PERSONALIZADO PARA SABER SI EL ID EXISTE CHECK(ID).CUSTOM(EXISTEcATEGORIA ) EN DB VALIDATORS
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

//CREAR una CATEGORIA - privado -cualquier persona con un token valido
router.post('/', [ 
    validarJWT ,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar una CATEGORIA por id - privado -cualquier persona con un token valido
router.put('/:id', [
    validarJWT ,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

//bORRAR una CATEGORIA por id - privado - Admin
router.delete('/:id', [
    validarJWT ,
    esAdminrole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria);



/*router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    //VALIDAR CAMPOS MANDA LOS ERRORES DE LOS MIDDLEWARES
    validarCampos
], login);


router.post('/google', [
    check('id_token', 'El id token es obligatorio').not().isEmpty(),
    //VALIDAR CAMPOS MANDA LOS ERRORES DE LOS MIDDLEWARES
    validarCampos
], googleSignin);*/

module.exports = router;