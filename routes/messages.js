var express = require('express');
var router = express.Router();

const MessageController = require('../controllers/MessageController');

router.param('id', MessageController.params);

router.route('/')
    .get(MessageController.index)
    .post(MessageController.create);


router.route('/:id')
    .get(MessageController.get)

module.exports = router;