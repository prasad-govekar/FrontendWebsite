const express=require('express');
const router=express.Router();
const enroll=require('../models/enroll');


exports.enroll=async (req,res)=>{ 
        const Enroll=new enroll({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            course:req.body.course
        });
        try{
            const a=await Enroll.save();
            res.statusCode(200);
        }
        catch(err){
            res.json({message:err});
        }
}