require('dotenv').config();
const cors = require('cors');
const express = require('express');

// const handlebars = require('express-handlebars')
const { engine } = require('express-handlebars');

const path = require('path');

const { dbConnectionMongoAtlas } = require('../database/db-config');
class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnectionMongoAtlas();
    }

    middlewares() {
        // Express HBS engine
        this.app.engine(
            "hbs",
            engine({
                layoutsDir: path.join(__dirname, "../views/layouts"), // Ruta de los layouts
                defaultLayout: "layout.hbs", // Layout por defecto
                extname: ".hbs", // Extensión de los archivos
            })
        );
        this.app.set("view engine", "hbs");
        this.app.set("views", path.join(__dirname, "../views"));
        // this.hbs.registerPartials(__dirname + '/views/partials', function(err) {});

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(express.urlencoded({ extendedparser : true })); Deprecado
        
        // Equivalentes en bodyparser
        // this.app.use(bodyParser.json())
        // this.app.use(bodyParser.urlencoded({ extended: true }));    
        
        // Cookie middlewares
        this.app.use(cookieParser());

        // Directorio publico
        this.app.use(express.static('public')); // Ruta de la carpeta public
        // this.app.use(express.static(path.join(__dirname, '/views')));
        // this.app.use(express.static(path.join(__dirname, 'public')));
    }

    routes() {   
        // this.app.use( this.authPath,     require('../routes/auth.routes'));
        // this.app.use('/',                require('../routes/info.routes'));
        // this.app.use( this.randomPath,   require('../routes/randoms.routes'));
        // this.app.use( this.usuariosPath, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server up on port: ', this.port);
        });
    }
}

module.exports = { Server };
