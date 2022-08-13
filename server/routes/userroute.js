const userModel = require("../modals/UserModal")
const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router()

const checkExistingUser = async (username)=> {
    let existingUser = false;
    await userModel.find({username: username}).then((userData)=> {
        if(userData.length) {
            existingUser = true;
        }
    });
    return existingUser;
}

const generatePasswordHash = (password) => {
    const salt = 10;
    return new Promise((resolve, reject)=> {
         bcrypt.genSalt(salt).then((hashSalt)=> {
            bcrypt.hash(password, hashSalt).then((passwordHash)=> {
                resolve(passwordHash);
            })
        })
    });
}

router.post("/register", async (req, res) => {
    // console.log(req.body)
    if (await checkExistingUser(req.body.username)) {
        res.status(400).send("Username exists. Please Try with different username");
    } else {
        generatePasswordHash(req.body.password).then((passwordHash) => {
            userModel.create({
               username:req.body.username,
               password:passwordHash
            }).then(() => {
                    res.status(200).send(`${req.body.username} added successfully`);
                }).catch((err) => {
                    res.status(400).send(err.message)
                })
        });
    }
});

router.post("/login", (req, res)=> {
    // console.log(req.body)
    userModel.find({username: req.body.username}).then((userData)=> {
        // console.log(userData)
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                // console.log(val)
                if(val) {
                    const authToken = jwt.sign(userData[0].username, process.env.SECRET_KEY);
                    // console.log(authToken)
                    res.status(200).send({authToken});
                } else {
                    res.status(400).send("Invalid Password");
                }
            })
        }else{
            res.status(400).send("No such user")
        } 
    })
});

router.get("/details",(req,res)=>{
    const username=jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
    userModel.find({username:username}).then((data)=>{
        res.status(200).send(data[0])
    })
})
router.post("/logout", (req, res)=> {
    res.status(200).send("logout works");
});

module.exports = router
