const express = require('express');
const authMiddleware = require("../middleware");
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
    const account = await account.findOne({
        userID : req.userID
    })
    res.json({
        balance : account.balance
    })
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body ;
    if(!amount || amount<0){
        return res.json({
            message : "Invalid amount"
        })
    };
    const account = await account.findOne({userID:req.userID}).session(session);
    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.json({
            message : "Insuffient Balance"
        })
    }
    const toAccount = await account.findOne({userID:to}).session(session);
    if(!toAccount){
        return req.json({
            message : "Invalid account"
        })
    }

    await account.updateOne({userID:req.userID},{$inc:{balance:-amount}}).session(session);
    await account.updateOne({userID:to},{$inc:{balance:+amount}}).session(session);

    await session.commitTransaction();
    return res.json({
        message: "Transaction complete"
    })
})

module.exports = router;