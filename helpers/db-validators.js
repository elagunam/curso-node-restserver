const { Categoria, Usuario, Role, Producto } = require('../models');
//const Role = require('../models/role');
//const Usuario = require('../models/usuario');


const esRoleValido = async (rol= '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const isEmailValid = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`El correo ${correo} ya esta registrado en la BD`);
    }

}


const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario ${id} no existe`);
    }

}


const existeCategoria = async (id = '') => {
    const existeCateoria = await Categoria.findById(id);
    if(!existeCateoria){
        throw new Error(`La categoria ${id} no existe`);
    }

}


const existeProducto = async (id = '') => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El producto ${id} no existe`);
    }

}







module.exports = {
    esRoleValido,
    isEmailValid,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}