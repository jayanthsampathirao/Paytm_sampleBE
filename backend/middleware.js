const JWT_secret = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization ;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.json({
            message : "Acess denied"
        })
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_secret);
        if(decoded.userID){
            req.userID = decoded.userID;
            next();
        }else{
            return res.json({
                message : "authorization occured"           
            })
        }
    }catch(err){
        return res.json({
            message : "error occured"
        })
    }
};

module.export = authMiddleware ;