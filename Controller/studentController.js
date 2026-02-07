const Student = require('../Model/student')
require('../Model/course')


// This is creation of student
const createStudent = async (req, res) => {
    try{
        const { name, age, email, course } = req.body

        const student = new Student({name, age, email, course})
        await student.save()

        res.status(201).json(student)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

// read students
const readStudents = async (req, res) => {
    try{
        const students = await Student.find()
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


module.exports = { createStudent, readStudents, readStudentById, updateStudent, deleteStudent, deleteStudentWithEmail, updateStudentByEmail }