const Course = require('../Model/course')
require('../Model/teacher')
const Student = require('../Model/student')


// create course
const createCourse = async (req, res) => {
    try{
        const course = await Course.create(req.body)
        res.status(201).json(course)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


// Get courses with teacher info
const getCourses = async (req, res) => {
    try{
        const courses = await Course.find().populate('teacher')
        res.status(200).json(courses)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}



// to find all students optings for a particular course
// Student.find({course: courseId})
const getStudentWithCourse = async (req, res) => {
    try{
        const courseId = req.params.courseId
        const students = await Student.find({course: courseId})

        res.status(200).json(students)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


module.exports = { createCourse, getCourses, getStudentWithCourse }