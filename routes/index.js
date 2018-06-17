const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const adb = require('../models/queries');
/*--------------- Usuarios -------------------*/
router.get('/api/users', adb.getAllUsers);
router.get('/api/users/:id', adb.getSingleUser);
router.post('/api/users', adb.createUser);
router.put('/api/users/:id', adb.updateUser);
router.delete('/api/users/:id', adb.removeUser);

module.exports = router;
