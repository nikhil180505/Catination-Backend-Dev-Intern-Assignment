const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { string } = require('zod');
const Task = require('./tasks');

const userSchema = new mongoose.Schema({
    name : { 
        type : String,
        require : true
    },
    email :{
        type : String,
        unique: true
    },
    password : {
        type:String,
        require:true 
    }

});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password, 10 );
    next();
});

const User=mongoose.model('User',userSchema);
module.exports=User;