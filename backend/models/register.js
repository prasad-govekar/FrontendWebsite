const mongoose=require('mongoose');

const RegisterSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmed:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('register',RegisterSchema);