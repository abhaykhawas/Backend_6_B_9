const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expertise: String,
    expereince: Number
}, {timestamps: true})

module.exports = mongoose.model("Teacher", teacherSchema)