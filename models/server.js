const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads',
        }


        //this.usuariosRoutePath = '/api/usuarios';
        //this.authPath = '/api/auth';

        //Conectar a base de datos
        this.conectarDB();


        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE LA APPLICACION
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //PARSEO Y LECTURA DEL BODY
        //CON ESTO TODO LA INFORMACION RECIVIDA Y LA TRANSFORMA EN JSON
        this.app.use(express.json());

        
        //DIRECTORIO PUBLICO
        this.app.use(express.static('public'));


        //CARGA DE ARCHIVOS
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));



    }

    routes(){
        //this.app.use(this.usuariosRoutePath, require('../routes/user.routes'));
        this.app.use(this.paths.usuarios, require('../routes/user.routes'));
        //this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categorias, require('../routes/categoria.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
       /* this.app.get('/api',  (req, res) => {
            res.status(200).json({
                msg: 'Peticion GET APi'
            });
        });

        this.app.put('/api',  (req, res) => {
            res.status(500).json({
                msg: 'Peticion PUT APi'
            });
        });

        this.app.post('/api',  (req, res) => {
            res.status(201).json({
                msg: 'Peticion POST APi'
            });
        });

        this.app.delete('/api',  (req, res) => {
            res.status(200).json({
                msg: 'Peticion DELETE APi'
            });
        });

        this.app.patch('/api',  (req, res) => {
            res.status(200).json({
                msg: 'Peticion PATCH APi'
            });
        });*/
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }



}

module.exports = Server;