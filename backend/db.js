const mongoose = require("mongoose");

mongoose.connect("DB_URL")

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
