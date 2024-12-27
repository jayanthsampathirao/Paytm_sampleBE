const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {User} = require("../db");
const JWT_secret = require("../config");
const authMiddleware = require("../middleware");
const router = express.Router();

const signUpSchema= zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    password : zod.string()
})
router.post("/signup",async(req,res)=>{
    const body = req.body();
    const {success}= signUpSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message : "Email already taken/Incorrect Inputs"
        })
    }
    const existingUser = User.findOne({
        username : body.username 
    })
    if(user._id){
        return res.json({
            message : "Email already taken/Incorrect Inputs"
        })
    }

    const user = await User.create({
        username : req.body.username ,
        password : req.body.password ,
        firstName : req.body.firstName ,
        lastName : req.body.lastName ,
    })
    const user_id = user._id ;
    await Account.create({
        user_id,
        balance : Math.random()*1000
    })

    const newUser = await User.create(body);
    const token = jwt.sign({
        newUser_id : newUser._id ,
    },JWT_secret);
    if(newUser){
        return res.json({
            message : "New user succesfully created",
            token : token
        })
    }
})


const updateBody = zod.object({
    username : zod.string().optional,
    firstName : zod.string().optional ,
    lastName : zod.string().optional
})


router.put("/",authMiddleware,async(req,res)=>{
    const {success}= updateBody.safeParse(req.body);
    if(!success){
        return res.json({
            message : "Error occured while updating information"
        })
    }
    await User.updateOne(req.body,{
        id:req.userId
    });     
    res.json({
        message : "updated successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router ;