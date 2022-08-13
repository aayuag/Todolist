const todoModel = require("../modals/todolistmodel")
const express = require("express")
const jwt = require("jsonwebtoken");

const router = express.Router()

router.post("/add",(req,res)=>{
    
   const user= jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
    // console.log(user)
    todoModel.create({
        username:user,
        Activity:req.body.activity,
        Status:"Pending",
        timetaken:""
    }).then((data)=>{
        res.status(200).send("todo Created Successfully")
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
   
})


router.get("/all",(req,res)=>{
    const user=jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
        todoModel.find({username:user}).then((data)=>{
            res.status(200).send(data)
        })
    })

router.post("/updatetask",(req,res)=>{
    
    todoModel.updateOne({_id:req.body._id},{ $set:{timetaken:req.body.timetaken}}).then(()=>{
        todoModel.updateOne({_id:req.body._id},{ $set:{Status:"Completed"}}).then(()=>{
            res.status(200).send("Changed Successfully")
        }).catch((err)=>{
            res.status(400).send(err)
        })
    })
})

module.exports = router
