const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        title: String,
        duration: Number,
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model("Course", courseSchema)