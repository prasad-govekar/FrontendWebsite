const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT
// mongoose.connect('mongodb://127.0.0.1:27017/wt')
mongoose.connect(process.env.MONGO_URL)
.then(() => { 
    console.log("connected to DB!")
    console.log("Listening on 3000")
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
});

const staticPath = path.join(__dirname,'../');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.use(express.static(staticPath));
app.set('view engine', 'html');

app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/pages'));

app.listen(port);

