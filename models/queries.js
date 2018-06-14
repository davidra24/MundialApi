var pg = require('pg');
var conString = process.env.DATABASE_URL+'?ssl=true';
var client = new pg.Client(conString);
client.connect();
module.exports = query{
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};

function getAllUsers(req, res, next) {
  db.any('select * from usuarios')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleUser(req, res, next) {
  var usrsID = parseInt(req.params.id);
  db.one('select * from usuarios where id = $1', usrsID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function createUser(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into usuarios(nombre,genero, correo, contrasena, avatar, tipo)' +
      'values(${nombre}, ${genero}, ${correo}, ${contrasena}, ${avatar}, ${tipo})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function updateUser(req, res, next) {
  db.none('update usuarios set nombre=$1, genero=$2, correo=$3, contrasena=$4, avatar=$5, tipo=$6 where id=$7',
    [req.body.nombre, req.body.genero, req.body.correo,
      req.body.contrasena, req.body.avatar, req.body.tipo, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removePuppy(req, res, next) {
  var usrID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', usrID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} User`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
