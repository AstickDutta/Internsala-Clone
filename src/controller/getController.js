const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");

// ===================================== College Details ==============================================================

const getCollegeDetails = async (req, res) => {
  try {
    const collegeName = req.query.collegeName;

    // ============================ provide data to fetch the details ==============================================================

    if (!collegeName) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Oppss..!! please provide data to fetch the details",
        });
    }
    const result = {};

    // ======================================= find college data by using college Name ====================================

    const collegeData = await collegeModel.findOne({
      name: collegeName,
      isDeleted: false,
    });
    if (!collegeData) {
      return res
        .status(404)
        .send({
          status: false,
          message: "Oh noo..!! collegeName doesn't Exit",
        });
    }

    // ================================== get all interns related to this college _id ===================================================================

    const internList = await internModel
      .find({ collegeId: collegeData._id, isDeleted: false })
      .select({ name: 1, email: 1, mobile: 1 });

    result.name = collegeData.name;
    result.fullName = collegeData.fullName;
    result.logoLink = collegeData.logoLink;
    result.interns = internList;

    // ========================== if no intern applied ===================================================================

    if (isValidBody) {
      return res
        .status(400)
        .send({ status: false, message: "Oppss..!! No intern applied" });
    }

    return res.status(200).send({ status: true, message: result });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { getCollegeDetails };
