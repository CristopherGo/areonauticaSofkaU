let alerta = require('alert');
const Naves = require('../naves'); //requiriendo el archivo donde esta la clase

//instancia de la clase nave
  //se crea una consulta sql accediendo a los metodos get de la clase nave 
  //que poseen los datos del formulario, y se ejecuta la consulta para guardarlos en BD

function create(req, res) {
  const nav = new Naves(req.body); 
  let consult = `INSERT INTO naves(nombre, tipo, origen, peso, potencia, velocidad)` +
    ` VALUES ('${nav.getNombre()}','${nav.getTipo()}', '${nav.getOrigen()}', ${nav.getPeso()}, ${nav.getPotencia()}, ${nav.getVelocidad()})`;

  req.getConnection((err, conn) => {
    conn.query(consult, (err, rows) => {
      if (err) { res.json(err); }
      res.redirect('/');
    });
  });
}
//lee la base de datos y compara si hay un dato ya existente para poder guardarlo
function validar(req, res) {
  let nom = req.body.nombre
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM naves WHERE nombre = ?', [nom], (err, rows) => {
      if (err) { res.json(err); }
      if (rows.length == 0) {
        create(req, res);
        alerta('Guardado Exitoso!')
      } else {
        alerta('Este tipo de nave ya se encuetra en la Base de Datos!')
        res.render('./activites/crear')
      }
    });
  });
}

//ejecuta una consulta con dos filtros solicitados por el cliente
// para optener toda la info especificada
function busquedaAvanzada(req, res) {
  const tipo = req.body.tipo
  const pot = req.body.potencia
  let consult = 'SELECT * FROM `naves` WHERE tipo="' + [tipo] + '" AND potencia >=' + [pot];
  req.getConnection((err, conn) => {
    conn.query(consult, (err, naves) => {
      if (err) {
        res.json(err);
      }
      res.render('./activites/mostrar_avanzado', { naves });
    });
  });
}

//envia una parte de la informacion de DB que cumplen con la peticion del cliente
function busquedaSimple(req, res) {
  const nom = req.body.nombre;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM naves WHERE nombre = ?', [nom], (err, naves) => {
      if (err) { res.json(err); }

      res.render('./activites/mostrar_simple', { naves });
    });
  });
}

//exporta las funciones para que el router asigne las acciones 
module.exports = {
  busquedaAvanzada: busquedaAvanzada,
  create: create,
  validar: validar,
  busquedaSimple: busquedaSimple
}