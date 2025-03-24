const User = require('../models/users');
const {jwtAuthMiddleware,generateToken} = require('../jwt');
const bcrypt = require("bcryptjs");


const register = async(req,res) =>{
    try{

        const data = req.body;
           
        const newUser = new User(data);
        const response = await newUser.save();

        console.log("newUser created & saved");

        const payload = {id : response.id}

        const token = generateToken(payload);
        console.log("token id : ",token);

        return res.status(201).json({message : "User succesfully created"});


    }catch(err){
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists. Please use a different email." });
        }

        console.error(err);
        return res.status(500).json({ error: "There was an error while creating the user." });
    }
};

const login = async(req,res)=>{
    try{
        const {email,password} = req.body

    const user = await User.findOne({email:email});
   
    if(!user || !(await bcrypt.compare(password , user.password))){ 
        return res.status(401).json({message : " invalid email or password "});
    }  

    const payload = {id : user.id}; 
    const token = generateToken(payload);
    return res.status(400).json({token,message : " you are sigining In"});
    }catch(err){
        console.log(err);
        res.status(200).json({message : "there was some issue while loginig in "});
    }

};

module.exports = {register,login};