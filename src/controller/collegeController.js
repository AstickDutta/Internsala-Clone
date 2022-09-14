const collegeModel = require("../model/collegeModel");


const isvalidResquest = (requestBody) => {
    return Object.keys(requestBody).length > 0
}



const createCollege = async (req, res) => {
    try {
        let requestBody = req.body
        if (!isvalidResquest(requestBody)) return res.status(400).send({ satus: false, message: " please provid valid details in body section" })

        let { name, fullName, logoLink } = requestBody

        if (!name) return res.status(400).send({ status: false, message: "Oppss..!! name is Required" });
        
        if (!fullName) return res.status(400).send({ status: false, message: "Oppss..!! fullName is required" });
        
        if (!logoLink) return res.status(400).send({ status: false, message: "Oppss..!! logo link is required" });

        let newName = await collegeModel.findOne({ name })
        if (newName) return res.status(400).send({ status: false, message: "Oppss..!! name is already used" });


        let saveData = await collegeModel.create(requestBody);
        return res.status(201).send({ status: true, data: saveData })


    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, meessage: err.meessage })
    }
}









module.exports.createCollege = createCollege