const mongoose =  require("mongoose");


const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },

    fullName: {
        type: String,
        require: true,
    },

    logoLink: {
        type: String,
        require: true
    },

    isDeleted: {
        type: Boolean,
        default: false

    }
    
},{ timestamps: true});

module.exports = mongoose.model("college", collegeSchema)