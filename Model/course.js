const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        title: String,
        duration: Number,
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        capacity : {
            type: Number,
            default: 3,
            min: 3,
            max: 500
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model("Course", courseSchema)