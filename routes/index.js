const express = require('express')
const router = express.Router();
const homecontroller = require('../controllers/homecontroller')

router.get('/', homecontroller.homepage);
router.use('/auth', require('./auth'));
router.use('/user', require('./homepage'))
router.use('/employee', require('./employee'))


module.exports = router;