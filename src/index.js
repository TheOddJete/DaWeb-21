const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

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


app.use(require('./routes/index'));

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Public 
app.use(express.static(path.join(__dirname, 'public')));

//Start
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto: ', app.get('port'));
});

//Base de datos
const pool = require('./database');
