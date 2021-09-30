const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //MANDAMOS EL ID DEL USUARIO A LOS PARAMETROS DEL CONTROLADOR DESPUES DE PASAS PRO ESTE MIDELWARE
        req.uid = uid;

        const usuarioAutenticado = await Usuario.findById(uid);
        if(!usuarioAutenticado){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            });
        }


        //VERIFICAMS SI EL USUARIO TIENE ESTADO TRUE
        if(!usuarioAutenticado.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado inactivo'
            });
        }


        //MANDAMOS EL USUARIO AUTENTICADO DE UNA VEZ
        req.usuarioAutenticado = usuarioAutenticado;

        //console.log(payload);

        next();    
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
        
    }

    //console.log(token);

    

}

module.exports = {
    validarJWT
}