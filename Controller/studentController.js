const Student = require('../Model/student')
const Course = require('../Model/course')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


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

const searchStudents = async (req, res) => {
    try{
        const { minAge, course, isActive } = req.query

        const page = parseInt(req.query.page) || 1
        const limit = 2
        const skip = (page - 1) * limit

        let filter = {}

        if(minAge) {
            filter.age = {$gte : minAge}
        }

        if(course) {
            filter.course = course
        }

        if(isActive == 1) {
            filter.isActive = true
        }
        else if (isActive == 2) {
            filter.isActive = false
        }
        

        // Think about filter for grade

        // Think about total number of pages (count) return to frontend


        const students = await Student.find(filter).skip(skip).limit(limit)

        res.status(200).json(students)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}


// Test all API


const register = async (req, res) => {
    try{
        const { name, age, email, course, password} = req.body 

        const exsistingUser = await Student.findOne({ email })

        if(exsistingUser) {
            return res.status(400).json({ message: "User already exsists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const student = await Student.create({ name, age, email, course, password:hashedPassword })

        const token = jwt.sign(
            { id: student._id, type: "student" },
            "THis is my secret",
            { expiresIn: "5m" }
        )

        res.status(201).json({
            message: "Student registered successfully",
            token,
            student
        })

    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body

        const exsistingStudent = await Student.findOne({ email })

        if(!exsistingStudent) {
            return res.status(404).json({ message: "Invalid Credentails" })
        }

        const isMatch = await bcrypt.compare(password, exsistingStudent.password)

        if(!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            { id: exsistingStudent._id, type: "student" },
            "THis is my secret",
            { expiresIn: "5m" }
        )

        res.status(200).json({
            message: 'Login Successful',
            token: token,
            email: exsistingStudent.email
        })
    }
    catch{
        res.status(400).json({error: err.message})
    }
}


const updateStudentByStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(
            req.user.id,
            req.body,
            {new : true}
        )
        res.status(200).json(student)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = { 
    createStudent, 
    readStudents, 
    readStudentById, 
    updateStudent, 
    deleteStudent, 
    deleteStudentWithEmail, 
    updateStudentByEmail, 
    softDeleteStudent,
    addGrade,
    searchStudents,
    register ,
    login,
    updateStudentByStudent
}