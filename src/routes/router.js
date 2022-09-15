const express = require('express')
const routes = express.Router()

const collegeController = require('../controller/collegeController')
const internController = require('../controller/internController')
const getController = require('../controller/getController')





routes.post('/functionup/interns', internController.createIntern)
routes.post('/functionup/colleges', collegeController.createCollege)
routes.get('/functionup/collegeDetails', getController.getCollegeDetails)

module.exports = routes