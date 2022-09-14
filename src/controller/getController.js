const collegeModel = require ('../model/collegeModel')
const internModel = require ('../model/internModel')
const mongoose = require ('mongoose')

// =====================================College Details==============================================================


const getCollegeDetails = async function (req, res){
    try {

        const collegeName = req.query.collegeName

        if (!collegeName){
            return res.status(400).send({status: false, message: "Please provide college name in queryparam"})
        }

        const result = {}

// ======================================= find college data by using college Name ====================================
       
    
            const collegeData = await collegeModel.findOne({name: collegeName, isDeleted: false })
            if (!collegeData) {
                return res.status(404).send({ status: false, message: "collegeName doesn't Exit" })
            }

// ================================== get all interns related to this college _id ===================================================================
    
const internList = await internModel.find({collegeId: collegeData._id, isDeleted: false}).select({name: 1, email: 1, mobile: 1})
    
result.name = collegeData.name
result.fullName = collegeData.fullName
result.logoLink = collegeData.logoLink
result.interns = internList

if (Object.keys(internList).length == 0){
    return res.status(400).send({status: true, message: "No intern applied"})
}
                 
return res.status(200).send({status: true, message: result})
    }
    catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}


module.exports.getCollegeDetails = getCollegeDetails