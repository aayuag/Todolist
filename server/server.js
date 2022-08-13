const express = require('express')
const mongoose=require("mongoose")
const cors = require('cors');
const usercontroller=require("./routes/userroute")
const todocontroller=require("./routes/todoroute")

const app = express()
require('dotenv').config();
app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log("server is running")
    } else {
        console.log(err)
    }
})


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use("/user",usercontroller)

app.use("/list",todocontroller)

mongoose.connect(process.env.MONGODB_URL,(err)=>{
    if(!err){
        console.log("Connected to database");
    }else{
        console.log(err);
    }
})