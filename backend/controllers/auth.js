const register = require('../models/register');
const enroll = require('../models/enroll');
const jwt = require('jsonwebtoken');
const email = require('../controllers/email');


exports.register = async (req, res) => {

    let values = [];

    try {
        values = await register.findOne({ "email": req.body.email });
    }
    catch (err) {
        res.json({ status: "error", error: "Some error occured" });
    }

    if (values != null) {
        res.json({ status: "error", msg: "Email already registered" });
    }
    else {
        const Register = new register({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });
        try {

            Register.save().then(() => {
                register.findOne({ "email": req.body.email }).then((data) => {
                    if (email("verify",data.id, data.email)) {
                        // res.json("check email");
                        res.json({ status: "success", msg: "Confirm your email and login" });
                    }
                    else {
                        res.json({ status: "error", msg: 'Some error occured please register again' });
                    }
                })

            })

        }
        catch (err) {
            res.json({ message: err });
        }
    }

};

exports.login = async (req, res) => {
    let values = [];

    try {
        values = await register.findOne({ "email": req.body.email });
    }
    catch (err) {
        return res.status(404);
    }
    if (values == null) {
        res.json({ status: "error", msg: 'Email not registered' });
    }
    else if (!values.confirmed) {
        res.json({ status: "error", msg: 'Please verify your email first' });
    }
    else if (values.password != req.body.password) {
        res.json({ status: "error", msg: 'Check your login credentials' });
    }
    else {
        const token = jwt.sign({ id: values.id }, "ayush1234", {
            expiresIn: 60 * 60,
        })

        const cookieOptions = {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            httpOnly: true
        }

        res.cookie("userLoggedIn", token, cookieOptions);
        res.json({ status: "success", success: "Logged In" });
    }

};

exports.logout = (req, res) => {
    res.clearCookie("userLoggedIn");
    res.json({ status: "success" });
    // res.redirect('/');
}
exports.delete = async(mail) =>{
    try{
        await register.deleteOne({email:mail});
        await enroll.deleteOne({email:mail});
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
    
    
}


exports.loggedIn = async (req, res, next) => {
    // console.log(req.cookies.userLoggedIn);
    // if(!req.cookies.userLoggedIn) return res.user="error";
    try {
        const decoded = jwt.verify(req.cookies.userLoggedIn, "ayush1234");
        let values = [];
        values = await register.findOne({ _id: decoded.id });
        if (values != null) {

            res.email = values.email;
            return next();
        }
    } catch (err) {
        next();
    }
};

exports.getDetails = async (req, res) => {
    try {
        const data = await register.findOne({ email: res.email });
        const enrollData = await enroll.findOne({ email: res.email });
        // console.log(enrollData);
        // console.log(data);

        if (enrollData) {
            if (enrollData.fees) {
                let newData = {
                    name: enrollData.name,
                    email: enrollData.email,
                    phone: enrollData.phone,
                    course: enrollData.course,
                    fees: enrollData.fees
                }
                res.json(newData);
            } else {
                let newData = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    course: undefined,
                    fees: undefined
                }
                res.json(newData);
            }

        }
        else {
            let newData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                course: undefined,
                fees: undefined
            }
            res.json(newData);
        }
    }
    catch (err) {
        res.json({ error: "Some error occured in db" });
    }
};
