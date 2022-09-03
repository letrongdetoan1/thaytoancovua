require('dotenv').config();
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');

const { startup } = require('./startup');

const app = express();

app.set('view engine', 'ejs');
app.use('/',(express.static(path.join(__dirname,'./publics'))))
app.use('/views',(express.static(path.join(__dirname,'./views'))))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
// app.use(cors());
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
// }));
// app.use(passport.authenticate('session'));

startup(app);

app.listen(process.env.PORT, () => {
    console.log('http://localhost:3000/');
});