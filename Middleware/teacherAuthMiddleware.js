module.exports = (req, res, next) => {
    try{
        if(req.user.type != 'teacher' ){
            return res.status(403).json({message: "You are not allowed"})
        }
        next()
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
}