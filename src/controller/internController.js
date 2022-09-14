const mongoose = require('mongoose')
const internModel = require('../model/internModel')

const createIntern =  async (req, res) =>{

    const {name,email,mobile,collegeName,isDeleted} = req.body
    res.send({status:true, data:req.body})
}



module.exports = {createIntern}