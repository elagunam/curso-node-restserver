const validarCampos = require('../middlewares/validar-campos');
const  validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
//AL SER UN ARCHIVO INDEX JS, PODEMOS EXPORTAR TODOS LOS METODOS QUE TIENE CADA MIDDLEWARE
module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}