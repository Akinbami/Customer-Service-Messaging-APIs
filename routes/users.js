var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');

router.param('id', UserController.params);

router.route('/')
    .get(UserController.index)
    .post(UserController.create);

router.route('/:id')
    .get(UserController.get)
    .put(UserController.update)
    .delete(UserController.delete)


module.exports = router;