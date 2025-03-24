const express = require('express');
const connectDB = require('./db'); 
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/",(req,res)=>{
    res.send("hello");
}); 

app.listen(PORT, () => { 
    console.log(`Listening on port: ${PORT}`);  
});
 