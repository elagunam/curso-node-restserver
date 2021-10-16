const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },//REFERIMOS ESTE CAMPO A OTRO ID, ES COMO LLABE FORANEA
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    img:{
        type: String
    },
    descripcion:{ type: String},
    disponible:{ type: Boolean, default: true},
});


//SE USA FUNCJON NORMAL PARA MODER USAR THIS
ProductoSchema.methods.toJSON = function (){
    //QUITAMOS A VERSION Y LA CONTRASEÑA DEL MODELO PARA NO IMPRIMIRLOS, INDICAMOS QUE TODO LO DEMAS LO INCLUY ACOMO UN OBJETO USER
    const {__v, estado, ...data} = this.toObject();
    return data;
}

module.exports =  model('Producto', ProductoSchema);