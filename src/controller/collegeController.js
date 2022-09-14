const mongoose = require ("mongoose")
const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");


const createCollege = async (req,res) => {
    try{
    let requestBody = req.body
    let saveData = await collegeModel.create(requestBody);
    return res.status(201).send({ status : true, data: saveData})
    

}catch (err){
    console.log(err)
    return res.status(500).send({status : false, meessage: err.meessage})
}
}






module.exports.createCollege = createCollege