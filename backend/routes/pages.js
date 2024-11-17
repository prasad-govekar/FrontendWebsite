const express = require('express');
const router = express.Router();
const path = require('path');
const postEnroll = require('../controllers/postEnroll');
const auth = require('../controllers/auth');
const payment = require('../controllers/payment');
const email = require('../controllers/email');
const notes=require('../controllers/notes');
const register = require('../models/register');
const jwt=require('jsonwebtoken');


const staticPath = path.join(__dirname, '../../');

router.get('/' ,(req, res) => {
    res.sendFile('index.html', { root: staticPath });
});

 
router.get('/german', auth.loggedIn, (req, res) => {
    if (res.email) {
        res.sendFile('german.html', { root: staticPath });
    }
    else {
        res.sendFile('login.html', { root: staticPath });
    }
});

router.get('/spanish', auth.loggedIn, (req, res) => {
    if (res.email) {
        res.sendFile('spanish.html', { root: staticPath });
    }
    else {
        res.sendFile('login.html', { root: staticPath });
    }
});

router.get('/english', auth.loggedIn, (req, res) => {
    if (res.email) {
        res.sendFile('english.html', { root: staticPath });
    }
    else {
        res.sendFile('login.html', { root: staticPath });
    }
});

router.get('/home', auth.loggedIn, (req, res) => {
    if (res.email) {
        res.sendFile('home.html', { root: staticPath });
    }
    else {
        res.sendFile('login.html', { root: staticPath });
    }
});

router.get('/profile', auth.loggedIn, (req, res) => {
    if (res.email) {
        res.sendFile('profile.html', { root: staticPath });
    }
    else {
        res.sendFile('login.html', { root: staticPath });
    }
});

router.get('/notes',notes.getNotes);

router.get('/profileDetails', auth.loggedIn, auth.getDetails);

router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: staticPath });
});
router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: staticPath });
    // res.render('login');
});

router.get('/logout',auth.logout);
router.get('/delete',auth.loggedIn,(req,res)=>{
    if(res.email){
        if(auth.delete(res.email)){
            res.clearCookie("userLoggedIn");
            res.json({status:"success"});
        }
    }else{
        res.json({status:"Cannot delete account now try again"});
    }
});

router.get('/getEmail',auth.loggedIn,(req, res)=>{
    res.json({email:res.email});
})

router.get('/confirmation/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, "email1234");

        register.findByIdAndUpdate(decoded.id,{confirmed:true}).then(()=>{

            res.redirect('/login');
        })
    } catch (e) {
        res.send('error');
    }
});

// router.get('/error',(req,res)=>{
//     res.render('error',{
//         loginStatus:true,
//         error:req.params.error
//     });
// })

router.post('/', postEnroll.enroll);
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/payment', payment.createOrder);
router.post('/enroll', payment.enrollData);
router.post('/paymentVerify', payment.verify);



module.exports = router;