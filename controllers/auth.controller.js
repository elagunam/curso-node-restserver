const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

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


const googleSignin = async (req = request, res = response) => {

    const {id_token} = req.body;
    
//    console.log(googleUser);

    try {
        const {correo, img, nombre} = await googleVerify(id_token);
        //VERIFICAR SI EL CORREO YA EXISTE EN LA BASE DE DATOS
        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //CREAR USUARIO
            const data = {
                nombre, 
                correo,
                password: ':p',
                img,
                google: true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        //SI EL USUARIO DB 
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario eliminado'
            });
        }


        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });






        
        /*res.json({
            msg: 'Todo Ok Google signin',
            token : id_token,
            googleUser
        });*/
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token de acceso no valido'
        });
        
    }

    

}

module.exports = {
    login,
    googleSignin
}