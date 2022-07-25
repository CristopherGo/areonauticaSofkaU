const express = require('express');//framework de node js para administrar las peticiones
const { engine } = require('express-handlebars');//motor de vistas
const connection = require('express-myconnection');//conxion db 
const bodyParser = require('body-parser'); // me permite obtener los datos de algunas peticiones
const mysql = require('mysql'); //base de datos mysql
const routes = require('./routes/route');// administrar las rutas 
const app = express(); 


app.set('port', 4000);//indicamos el puerto de nuestro localhost

//definimos middleware para trabajar

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//tambien nuestro motor de vistas con extension .hbs
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

//confiiguracion de la conexion DB
app.use(connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'vehiculosespaciales'
}, 'single'));

app.listen(app.get('port'), () => {
    console.log('server runnning in port: ', app.get('port'));
});

//rutas iniciales 
app.use('/', routes);

app.get('/', (req, res) => {
    res.render('principal');
});