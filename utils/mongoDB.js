const mongoose = require('mongoose')

function connectMongoDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB Connected")
        })
        .catch((err) => {
            console.log(err.message)
        })
}

module.exports = connectMongoDB