const mongoose = require("mongoose");
const { Schema,model } =require("mongoose");


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true } , 

  photo :{type :String } 



});

const UserBio = mongoose.model("UserBio", UserSchema);

module.exports = UserBio