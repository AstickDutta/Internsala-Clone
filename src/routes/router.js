const express = require('express')
const routes = express.Router()

const collegeController = require('../controller/collegeController')
const internController = require('../controller/internController')

routes.post('/functionup/interns', internController.createIntern)
routes.post('/functionup/colleges', collegeController.createCollege)

module.exports = routes