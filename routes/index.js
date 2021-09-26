var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const messageRouter = require('./messages');


router.use('/users', userRouter);
router.use('/messages', messageRouter);



module.exports = router;