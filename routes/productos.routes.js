const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const {validarJWT, validarCampos, esAdminrole} = require('../middlewares/');



const router = Router();

router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'Debe indicar la categoria del producto').not().isEmpty(),
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);


router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);


router.put('/:id', [
    validarJWT ,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],actualizarProducto);


router.delete('/:id', [
    validarJWT ,
    esAdminrole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(existeProducto),
    validarCampos
],borrarProducto);

module.exports = router;