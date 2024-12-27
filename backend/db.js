const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ce21b113:<mEUzC5q0VxLA2HV5>@cluster0.f7f888f.mongodb.net/")

const userSchema = new mongoose.schema({
    username : String ,
    password : String ,
    firstName : String ,
    lastName : String 
})

const accountSchema = new mongoose.schema({
    userID : 
    {type : mongoose.schema.Types.ObjectID ,
    ref : 'User' ,
    required : true },
    balance : {
        type : number ,
        required : true 
    }
})

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Acoount",accountSchema);
module.export = {
    User ,
    Account
}
