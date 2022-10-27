const mongoose = require ('mongoose');
const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:String,
    password:String,
    phone:Number,
    email:String,
    userTypes:String
})
module.exports = mongoose.model('User',userSchema)