const mongoose=require('mongoose');

const EnrollSchema=mongoose.Schema({
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
    course:{
        type:String,
        required:true
    },
    fees:{
        type:Boolean,
        default:false
    },
    paymentid:{
        type:String
    }
});

module.exports=mongoose.model('enroll',EnrollSchema);