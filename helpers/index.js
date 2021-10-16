const dbValidators = require('./db-validators');
const generaJWT = require('./generarJWT');
const googleVerifi = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...generaJWT,
    ...dbValidators,
    ...googleVerifi,
    ...subirArchivo,
}