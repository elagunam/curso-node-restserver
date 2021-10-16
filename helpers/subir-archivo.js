const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '')=>{

    return new Promise((resolve, reject) => {
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');

        const extension = nombreCortado[nombreCortado.length - 1];

        //VALIDAR LA EXTENCION
//        const extensionesValidas = extensionesValidas;
        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es permitida - ${extensionesValidas}`);
            //return res.status(400).json({msg: });
        }

        const nombreTemp = uuidv4()+'.'+extension;

        const uploadPath = path.join(__dirname , '/../uploads/' , carpeta, nombreTemp);

        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err);
                //return res.status(500).json({err});
            }

            return resolve(nombreTemp);
            //res.json({msg: 'File uploaded to ' + uploadPath});
        });
        
    });



    

}

module.exports = {
    subirArchivo
}