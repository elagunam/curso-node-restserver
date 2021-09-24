const { request, response } = require('express');


const usuariosGet = (req = request, res = response) => {
    //parametros query
    const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;//, nombre, apikey

    //, nombre, apikey
    res.json({
        msg: 'Peticion GET APi * CONTROLLER',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req = request, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'Peticion PUT APi * CONTROLLER',
        id
    });
}

const usuarioPost = (req = request, res = response) => {
    const {nombre, edad} = req.body;


    res.json({
        msg: 'Peticion POST APi * Controller',
        nombre, edad
    });
}

const usuarioDelete = (req, res = response) => {
    res.status(200).json({
        msg: 'Peticion DELETE APi * CONTROLLER'
    });
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