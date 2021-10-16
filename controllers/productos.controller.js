const { response, request } = require("express");
const {Categoria, Usuario, Producto} = require('../models/');





const crearProducto = async (req, res = response) => {
    const {nombre, precio, categoria, descripcion, disponible, ...resto} = req.body;

    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuarioAutenticado._id,
        categoria,
    };

    if(precio){
        data.precio = precio;
    }

    if(descripcion){
        data.descripcion = descripcion;
    }

    if(disponible){
        data.disponible = disponible;
    }

    const productoExiste = await Producto.findOne({
        $and: [{ nombre: nombre.toUpperCase() }, { categoria }]
    });

    if(productoExiste){
        return res.status(400).json({
            msg: `El producto ${productoExiste.nombre}, ya existe`
        });
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);

}

const obtenerProductos = async (req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const [total, productos] = await Promise.all([
        Producto.countDocuments({estado: true}),
        Producto.find({estado: true}).populate('usuario', 'nombre').populate('categoria', 'nombre').skip(Number(desde)).limit(Number(limite))
    ]);
    
    res.json({
        total,
        productos
    });
}


const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');
    res.json(producto);
}


const actualizarProducto = async (req, res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;



    data.nombre = data.nombre.toUpperCase();

    data.usuario = req.usuarioAutenticado._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto);
}


const borrarProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado : false}, {new: true});
    res.json(productoBorrado);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}