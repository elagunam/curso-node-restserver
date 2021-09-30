const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req = request, res = response)=>{
    const {correo, password} = req.body;

    try {
        //VERIFICAR SI EL EMAIL EXISTE
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - correo'
            });
        }


        //VERIFICAR SI EL USUARIO ESTA ACTIVO
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - estado: false'
            });
        }

        //VERIFICAR LA CONTRASEÑA
        const validaPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validaPassword){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - contraseña'
            });
        }

        //GENERAR EL JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    

}

module.exports = {
    login
}