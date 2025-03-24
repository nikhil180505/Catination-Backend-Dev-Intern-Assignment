const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { string, optional } = require("zod");
const User = require("./users");

const taskSchema = new mongoose.Schema({
    id : {
        type:String,
        default : uuidv4
    },
    title:{
        type:String,
        require : true,
    },
    description :{
        type : String
    },
    status : {
        type : String,
        enum: ["pending", "in-progress", "completed"],
        default : "pending"
    },
    dueDate :{
        type: Date,
        default : Date.now
    },
    createdAt :{
        type: Date,
        default : Date.now
    },
   
    userId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User",
        require: true
    }
})

const Task = mongoose.model("Taks",taskSchema);
module.exports = Task;