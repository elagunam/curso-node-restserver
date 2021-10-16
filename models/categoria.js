const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
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
    }
});


//SE USA FUNCJON NORMAL PARA MODER USAR THIS
CategoriaSchema.methods.toJSON = function (){
    //QUITAMOS A VERSION Y LA CONTRASEÑA DEL MODELO PARA NO IMPRIMIRLOS, INDICAMOS QUE TODO LO DEMAS LO INCLUY ACOMO UN OBJETO USER
    const {__v, estado, ...data} = this.toObject();
    return data;
}

module.exports =  model('Categoria', CategoriaSchema);