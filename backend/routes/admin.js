const express = require('express');
const enroll = require('../models/enroll');
const register = require('../models/register');
const adminController = require('../controllers/admin');
const router = express.Router();
const csvParser = require('json2csv').Parser;
const path = require('path');


const staticPath = path.join(__dirname, '../../');

router.get('/userlist',async(req, res)=>{

    try{
        let users=[];

        const userDb= await register.find({});
    
        userDb.forEach((user)=>{
            const { id, name, email, phone} = user;
            users.push({id, name, email, phone});
        });
    
        const csvFields = ['Id', 'Name', 'Email', 'Mobile no.'];
        const cParser = new csvParser({ csvFields });
        const csvData = cParser.parse(users);
    
        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attatchment: filename=userList.csv");
    
        res.send(csvData);
    }catch(error){
        res.send(error);
    }
});

router.get('/enrolldata',async(req, res)=>{

    try{
        let users=[];

        const userDb= await enroll.find({});
    
        userDb.forEach((user)=>{
            const { id, name, email, phone, course, fees, paymentid} = user;
            if(fees){
                let feesPaid="yes";
                users.push({id, name, email, phone, course, feesPaid, paymentid});
            }else{
                let feesPaid="no";
                users.push({id, name, email, phone, course, feesPaid});
            }
            
        });
    
        const csvFields = ['Id', 'Name', 'Email', 'Mobile no.', 'Course', 'Fees Paid','Payment ID'];
        const cParser = new csvParser({ csvFields });
        const csvData = cParser.parse(users);
    
        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attatchment: filename=userList.csv");
    
        res.send(csvData);
    }catch(error){
        res.send(error);
    }
});

router.get('/',(req,res)=>{
    res.sendFile('adminLogin.html',{ root: staticPath });
})

router.post('/', async(req,res)=>{

    let input={
        username:req.body.username,
        password:req.body.password
    }
    adminController(input).then((response)=>{
        if(response.status=="success"){
            res.sendFile('admin.html',{ root: staticPath });
            // res.send(response.msg);
        }
        else{
            res.send(response.msg);
        }
    })


    
})

module.exports = router;