const express = require('express')
const router = express.Router();
const homecontroller = require('../controllers/homecontroller')


router.get('/homepage', homecontroller.homepage);
router.post('/employeesform',homecontroller.employeesform)
module.exports = router;