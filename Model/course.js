const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        title: String,
        duration: Number
    },
    { timestamps: true }
)


module.exports = mongoose.model("Course", courseSchema)