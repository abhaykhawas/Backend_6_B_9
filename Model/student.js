const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 4,
        max: 28,
        required: true
    },
    // Figure out email validation
    email: {
        type: String,
        unique : true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    grades : [
        {
            subject: String,
            marks: Number
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("Student", studentSchema)