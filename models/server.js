const express = require('express');
var cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE LA APPLICACION
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //PARSEO Y LECTURA DEL BODY
        //CON ESTO TODO LA INFORMACION RECIVIDA Y LA TRANSFORMA EN JSON
        this.app.use(express.json());


        //DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosRoutePath, require('../routes/user.routes'));
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