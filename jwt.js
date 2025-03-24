const jwt = require('jsonwebtoken');
const User = require("./models/users.js");

const jwtAuthMiddleware = async(req,res,next)=>{

    const authorization = req.headers.authorization;

    if(!authorization){
        console.log("unauthorized");
        return res.status(401).json({status: 0, message : "unauthorizeed"});
    }

    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({success:0, message: "Authorized"});

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;

        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ success: 0, message: "Unauthorized: Invalid token" });
        }

        if(! await User.findById(userId)){
            return res.status(401).json({success:0, message: "Authorized"});
        }
        
        next();

    }catch(err){
        console.log(err);
        res.status(401).json({error : "Invalid token"});
    }
}

const generateToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET_KEY,{expiresIn : '1h'});
}

module.exports = {jwtAuthMiddleware,generateToken}