const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    nombre:{
        type: String
    },
    rol:{
        type: String,
        required: [true, 'El Rol del usuario es obligatorio'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});
//SE USA FUNCJON NORMAL PARA MODER USAR THIS
UsuarioSchema.methods.toJSON = function (){
    //QUITAMOS A VERSION Y LA CONTRASEÑA DEL MODELO PARA NO IMPRIMIRLOS, INDICAMOS QUE TODO LO DEMAS LO INCLUY ACOMO UN OBJETO USER
    const {__v, password, _id,...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('Usuario', UsuarioSchema);
