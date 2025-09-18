const mongoose = require('mongoose');

// const {Schema , model } = require('mongoose');

const UserLoginSchema = new mongoose.Schema(
    {
    name :{type : String , required : true } , 
    emailId :{ type :String , required:true , unique : true } , 
    password : {type: String , required:true} 
    },
    {timestamps: true} 
);


const UserSignUp = mongoose.model("loginanish" , UserLoginSchema);

module.exports = UserSignUp;

