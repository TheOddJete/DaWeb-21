const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

// Inicializaciones
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname).toLowerCase());
    }
})

//Public 
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/imagenes/uploads'),
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Formato de imagen no soportado");
    }
}).single('imagen'));

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/registro'));
app.use(require('./routes/perfil'));
app.use(require('./routes/registrarProducto'));
app.use(require('./routes/buscador'));
app.use(require('./routes/logout'));
app.use(require('./routes/misProductos'));
app.use(require('./routes/comprar'));
app.use(require('./routes/cambiar'));



//Start
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto: ', app.get('port'));
});

//Globals
//global.currentUser = undefined;

//Base de datos
//const pool = require('./persistencia/database');
