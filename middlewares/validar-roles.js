const { response, request } = require("express")

const esAdminrole = (req = request, res = response, next)=>{

    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }

    const {rol, nombre} = req.usuarioAutenticado;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - accion denegada`
        });
    }

    next();


}

const tieneRol = (...roles)=>{
    return (req = request, res = response, next) => {

        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            });
        }


        const {rol, nombre} = req.usuarioAutenticado;
        if(!roles.includes(rol)){
            return res.status(401).json({
                msg: `${nombre} no es (${roles}) - accion denegada`
            });
        }

        console.log(roles),
        next();
    }

}

module.exports = {
    esAdminrole,
    tieneRol
}