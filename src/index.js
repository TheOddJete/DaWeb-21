const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');
const session = require('express-session');
const flash = require('connect-flash');
const mysqlstore = require('express-mysql-session');

const database = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'daweb'
}

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

app.use(session({
    secret: 'prueba',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

//Globals
app.use((req, res, next) => {
    res.locals.correcto = req.flash('correcto');
    res.locals.fallo = req.flash('fallo');
    next();
  });

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

