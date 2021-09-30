const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {
    //parametros query
    //const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;//, nombre, apikey
    const {limite = 5, desde = 0} = req.query;
    //const usuarios = await Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite));


    //const total = await Usuario.countDocuments({estado: true});
    //CREAMOS UNA COLECCION DE PROMESAS PARA NO HACER WAITS POR CADA UNA, DE ESTA MANERA SE AHORRA TIEMPO DE EJECUCION
    //EJECUTA AMBAS DE MANERA SIMULTANEA Y REGRESA HASTA QUE TERMINA TODO
    //DESESTRUCTURAMOS EL ARREGLO PARA DARLES NOMBRES
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite))
    ]);

    //, nombre, apikey
    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id ,password, google, correo,  ...resto} = req.body;
    //TODO VALIDAR CONTRA BASE DE DATOS ID
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }


    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

    



    res.json(usuarioDB);
}

const usuarioPost = async (req = request, res = response) => {

    
    


    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //VERIFICAR SI EL CORREO EXISTE
    //SE MOVIO A LOS HELPERS
    /*const existeEmail =await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        });
    }*/

    //ENCRIPTAR CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //GUARDAR EN BASE DE DATOS

    await usuario.save();

    //const {nombre, edad} = req.body;


    res.json({
        usuario
    });
}

const usuarioDelete = async (req, res = response) => {
    const {id} = req.params;

    //ESTE UID nos lo indica el midleware que valida el JWT
    const uid = req.uid;

    const usuarioAutenticado = req.usuarioAutenticado;



    //BORRADO FISICO
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


//, uid, usuarioAutenticado
    res.status(200).json(usuario);
}

const usuarioPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'Peticion PATCH APi - CONTROLLER'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuarioDelete,
    usuarioPatch,
    usuarioPost
}