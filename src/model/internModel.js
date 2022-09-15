const mongoose = require("mongoose");


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim:true
    },

    email: {
        type: String,
        require: true,
        unique: true,
        trim:true
    },

    mobile:{
        type: String,
        require: true,
        unique: true,
        trim:true
    },

    collegeId:{
        type: mongoose.Types.ObjectId,
        ref: "college",
        trim:true

    },

    isDeleted:{
        type: Boolean,
        default: false
    }

    

},{ timestamps: true});


module.exports = mongoose.model("Intern", internSchema);
