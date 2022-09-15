const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')
const validator = require("email-validator");
const _ = require('lodash');
const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;



//===================================================== validations =============================================================================


const validName = (val) => {
    if (typeof val === "undefined" || typeof val === null)
        return false;
    if (typeof val === 'string' && val.trim().length == 0) return false
    return true;

}

// ============================================================ APIs / Interns ===================================================================================

const createIntern = async (req, res) => {
    try {

        const { name, email, mobile, collegeName, isDeleted } = req.body

        if (_.isEmpty(req.body)) {
            return res.status(400).send({ status: false, messgae: "Oppss..!! All fields are mendatory...." })
        }

        // ============================================================== validating name =========================================================

        if (!name) {
            return res.status(400).send({ status: false, messgae: "Oppss...!! Name is mendatory.." })

        } else if (!validName(name)) {
            return res.status(400).send({ status: false, message: "Oh noo...!! Blank Spaces are not Allowed in name" })


            // ============================================= email validation =======================================================

        } else if (!email) {
            return res.status(400).send({ status: false, messgae: "Oppss...!! email is mendatory.." })

        } else if (!validName(email)) {
            return res.status(400).send({ status: false, message: "Oh noo...!! Blank Spaces are not Allowed in email" })

        } else if (validator.validate(email) != true) {
            return res.status(400).send({ status: false, messgae: "Oppss...!! Invalid Email.." })
        }

        // ============================= mobile validation ======================================================================


        else if (!mobile) {
            return res.status(400).send({ status: false, messgae: "Oppss...!! mobile is mendatory.." })

        } else if (!validName(mobile)) {
            return res.status(400).send({ status: false, message: "Oh noo...!! Blank Spaces are not Allowed in mobile" })

        } else if (re.test(mobile) != true) {
            return res.status(400).send({ status: false, messgae: "Oppss...!! Invalid Mobile Number" })





            // ============================= collegeName validation ===========================================================

        } else if (!collegeName) {
            return res.status(400).send({ status: false, messgae: "Oppss...!! collegeName is mendatory.." })

        } else if (!validName(collegeName)) {
            return res.status(400).send({ status: false, message: "Oh noo...!! Blank Spaces are not Allowed in collegeName" })

        } else {

            // =============================== if intern are already registered ====================================================

            let findAllIntern = await internModel.find({ $or: [{ email: email }, { mobile: mobile }] })
            if (findAllIntern.length > 0) return res.status(400).send({ status: false, message: "Hey..!! You are already Registered.." })

            // ================================== if college not found ==========================================================

            let findAllCollege = await collegeModel.find({ "name": { $regex: collegeName, "$options": "i" } })
            if (findAllCollege.length < 1) return res.status(404).send({ status: false, message: "Oppss..!! College not found" })

            if (findAllCollege[0].name != collegeName) return res.status(400).send({ status: false, message: "Oh Noo...!! Invalid College Name" })

            collegeId = findAllCollege[0]._id

            let data = { name, email, mobile, collegeId, isDeleted }

            // ======================================= Intern created =====================================================================

            let createIntern = await internModel.create(data)
            res.status(201).send({ status: true, data: createIntern })
        }
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }

}

module.exports = { createIntern }