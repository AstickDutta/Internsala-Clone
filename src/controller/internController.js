const internModel = require("../model/internModel");
const collegeModel = require("../model/collegeModel");
const {
  isValidEmail,
  isValidNumber,
  isValid,
  isValidName,
} = require("../validators/validator");

// ============================================================ APIs / Interns ===================================================================================

const createIntern = async (req, res) => {
  try {
    const { name, email, mobile, collegeName, isDeleted } = req.body;

    if (isValid(req.body)) {
      return res
        .status(400)
        .send({
          status: false,
          messgae: "Oppss..!! All fields are mendatory....",
        });
    }

    // ============================================================== validating name =========================================================

    if (!name) {
      return res
        .status(400)
        .send({ status: false, messgae: "Oppss...!! Name is mendatory.." });
    } else if (!isValid(name)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oh noo...!! Blank Spaces are not Allowed in name",
        });
    } else if (!isValidName(name)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oh noo...!! name is should be proper format",
        });

      // ============================================= email validation =======================================================
    } else if (!email) {
      return res
        .status(400)
        .send({ status: false, messgae: "Oppss...!! email is mendatory.." });
    } else if (!isValid(email)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oh noo...!! Blank Spaces are not Allowed in email",
        });
    } else if (isValidEmail(email) != true) {
      return res
        .status(400)
        .send({ status: false, messgae: "Oppss...!! Invalid Email.." });
    }

    // ============================= mobile validation ======================================================================
    else if (!mobile) {
      return res
        .status(400)
        .send({ status: false, messgae: "Oppss...!! mobile is mendatory.." });
    } else if (!isValid(mobile)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oh noo...!! Blank Spaces are not Allowed in mobile",
        });
    } else if (isValidNumber(mobile) != true) {
      return res
        .status(400)
        .send({ status: false, messgae: "Oppss...!! Invalid Mobile Number" });

      // ============================= collegeName validation ===========================================================
    } else if (!collegeName) {
      return res
        .status(400)
        .send({
          status: false,
          messgae: "Oppss...!! collegeName is mendatory..",
        });
    } else if (!isValid(collegeName)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oh noo...!! Blank Spaces are not Allowed in collegeName",
        });
    } else if (!isValidName(collegeName)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oh noo...!! college name is should be proper format",
        });
    } else {
      // =============================== if intern are already registered ====================================================

      let findAllIntern = await internModel.find({
        $or: [{ email: email }, { mobile: mobile }],
      });
      if (findAllIntern.length > 0)
        return res
          .status(400)
          .send({
            status: false,
            message: "Hey..!! You are already Registered..",
          });

      // ================================== if college not found ==========================================================

      let findAllCollege = await collegeModel.find({
        name: { $regex: collegeName },
      });
      if (findAllCollege.length < 1)
        return res
          .status(404)
          .send({ status: false, message: "Oppss..!! College not found" });

      if (findAllCollege[0].name != collegeName)
        return res
          .status(400)
          .send({ status: false, message: "Oh Noo...!! Invalid College Name" });

      collegeId = findAllCollege[0]._id;

      let data = { name, email, mobile, collegeId, isDeleted };

      // ======================================= Intern created =====================================================================

      let createIntern = await internModel.create(data);
      res.status(201).send({ status: true, data: createIntern });
    }
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createIntern };
