const express = require('express')
const router = express.Router();
const employeesController = require('../controllers/employeesController')

router.get('/employeepage', employeesController.employeePage);
router.get('/delete/:id', employeesController.delete);

module.exports = router;