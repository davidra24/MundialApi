var pg = require('pg');
var conString = process.env.DATABASE_URL+'?ssl=true';
var client = new pg.Client(conString);
const usuarios = require('./usuarios');
client.connect();
var db = require('../queries');

router.get('/api/users', db.getAllUsers);
router.get('/api/puppies/:id', db.getSingleUser;
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);
