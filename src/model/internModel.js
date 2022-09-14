const mongoose = require("mongoose");


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    mobile:{
        type: String,
        require: true,
        unique: true
    },

    collegeId:{
        type: mongoose.Types.ObjectId,
        ref: "college"

    },

    isDeleted:{
        type: Boolean,
        default: false
    }

    

},{ timestamps: true});


module.exports = mongoose.model("Intern", internSchema);
