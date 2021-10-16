const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');
const {Usuario, Producto} = require('../models');
//IMPORTAMOS DOCUMENTOS CLOUDINARY
const cloudinary = require('cloudinary').v2;
//CONFIGURAMOS EL ACCESO A CLOUDINARY
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async(req = requestAnimationFrame, res = response) => {

    /*if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg:'No hay archivos para enlazar'});
        return;
    }

    if (!req.files.archivo) {
        res.status(400).json({msg:'No hay archivos para enlazar.'});
        return;
    }*/


    try {
        //imagnees
        //const pathFile = await subirArchivo(req.files, ['xlsx'], 'excels');
        const pathFile = await subirArchivo(req.files, undefined, 'imgs');
        return res.json({nombre: pathFile});
    } catch (error) {
        res.status(400).json({msg: error});
        return;
    }


    
}


const actualizarImagen = async (req, res = response) => {

    /*if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg:'No hay archivos para enlazar'});
        return;
    }*/


    const {id, coleccion} = req.params;
    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe el usuarios con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe el producto con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto DFLT'});
    }

    //LIMPIAR IMAGENES PREVIAS
    if(modelo.img){
        //hay que borrar la imagen del servidor
        //construimos el path
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        //verificamos si existe el path
        if(fs.existsSync(pathImg)){
            //ELIMIAMOS EL ARCHIVO
            fs.unlinkSync(pathImg);
        }


    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();

    return res.json(modelo);

    //img



    //res.json({id, coleccion});

}

const mostrarImagen = async(req, res = response)=>{
    const {id, coleccion} = req.params;
    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe el usuarios con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe el producto con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto DFLT'});
    }

    //LIMPIAR IMAGENES PREVIAS
    if(modelo.img){
        //hay que borrar la imagen del servidor
        //construimos el path
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        //verificamos si existe el path
        if(fs.existsSync(pathImg)){
            return res.sendFile(pathImg);
        }


    }


    const pathImg = path.join(__dirname, '../assets',  'no-image.jpg');
    //verificamos si existe el path
    if(fs.existsSync(pathImg)){
        return res.sendFile(pathImg);
    }


    return res.json({masg: 'Falta placeholder'});

    //img



    //res.json({id, coleccion});

}


const actualizarImageCloudinary = async(req, res = response) => {

    const {id, coleccion} = req.params;
    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe el usuarios con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe el producto con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto DFLT'});
    }

    //LIMPIAR IMAGENES PREVIAS
    if(modelo.img){
        //TODO: borrar imagne de cloudnari
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length -1];
        const [public_id] = nombre.split('.');
        //SIN AWAIT POR QUE NO ES NECESARIO ESPERAR UNA RESPUESTA
        cloudinary.uploader.destroy(public_id);

    }

    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    
    modelo.img = secure_url;
    await modelo.save();

    return res.json(modelo);

    /*try {
        const {tempFilePath} = req.files.archivo;
        const resp = await cloudinary.files.upload(tempFilePath);
        return res.json(resp);
    } catch (error) {
        const resp = error;
        return res.json(resp);
    }*/

    


    
    //modelo.img = nombre;
    //await modelo.save();

    //return res.json(resp);

    //img



    //res.json({id, coleccion});

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImageCloudinary
}