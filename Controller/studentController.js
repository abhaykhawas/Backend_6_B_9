const Student = require('../Model/student')
const Course = require('../Model/course')


// This is creation of student
const createStudent = async (req, res) => {
    try{
        const { name, age, email, course } = req.body

        const selectedCourse = await Course.findById(course)

        if(!selectedCourse) return res.status(404).json({message: "Course not found!!!"})

        // const totalStudentLength = (await Student.find({course})).length

        const totalStudentLength = await Student.countDocuments({ course })

        if(totalStudentLength >= selectedCourse.capacity) {
            return res.status(400).json({
                message: "Course is full. Enrollment Closed!!!"
            })
        }

        const student = new Student({name, age, email, course})
        await student.save()

        res.status(201).json(student)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

// read students
// student -> course
// course -> teacher
// Nested population
const readStudents = async (req, res) => {
    try{
        const students = await Student.find().populate({
            path: 'course',
            populate: {
                path: 'teacher'
            }
        })
        res.status(200).json(students)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}




// read single student by id 

const readStudentById = async (req, res) => {
    try{
        const student = await Student.findById(req.params.id).populate("course", "title -_id duration")
        // const stu = await Student.findOne({_id: req.params.id})
        res.status(200).json(student)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}



// update student
const updateStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )
        res.status(200).json(student)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


// update student by email (assume that we are not going update email but only update name and age)
const updateStudentByEmail = async (req, res) => { 
    
    if(req.body.email) {
        return res.status(400).json({message: "Cannot update email"})
    }
    const student = await Student.findOneAndUpdate(
        {email : req.params.email}, 
        req.body,
        {new: true}
    ) 

    res.status(200).json(student)
}

// delete student
const deleteStudent = async (req, res) => {
    try{
        await Student.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Student is deleted"})
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


// delete a student with email ID ? 
const deleteStudentWithEmail = async (req, res) => {
    try{
        const { email } = req.body
        await Student.findOneAndDelete({email})
        res.status(200).json({message: "student deleted by email"})
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

const softDeleteStudent = async (req, res) => {
    try{
        await Student.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        )

        res.status(200).json({message: "Student Deactivated"})

    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

// Adding grade one subject at a time
const addGrade = async (req, res) => {
    try{
        const { subject, marks } = req.body

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                $push: { grades: { subject, marks } }
            },
            { new : true }
        )

        res.status(200).json(student)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

// search & filter API

// Admin want :
// student age > 20
// student in specific course
// Student name

const searchStudents = async (req, res) => {
    try{

    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}


// Test all API


module.exports = { 
    createStudent, 
    readStudents, 
    readStudentById, 
    updateStudent, 
    deleteStudent, 
    deleteStudentWithEmail, 
    updateStudentByEmail, 
    softDeleteStudent,
    addGrade 
}