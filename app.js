const express = require('express')
const passport = require('passport')
const app = express()
const port = 3000
const session = require('express-session')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/publics',(express.static(path.join(__dirname,'./publics'))))
app.use('/views',(express.static(path.join(__dirname,'./views'))))
app.use(cookieParser())
app.use(cors());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})
mongoose.connect("mongodb://localhost:27017/thaytoancovua", () => {
    console.log('Database connected')
})
app.listen(port, () => {
    console.log(`http://localhost:3000/login`)
})