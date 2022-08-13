const mongoose=require("mongoose")
const todoSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    Activity:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true,
    },
    timetaken:{
        type:String
    }
})
const todoModel=mongoose.model("todo",todoSchema)
module.exports=todoModel