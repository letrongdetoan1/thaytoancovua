require('dotenv').config();

const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const arrUserInfo = [];
io.on('connection', (socket) => {
    socket.on('NGUOI_DUNG_DANG_KY', user => {
        const isExist = arrUserInfo.some(e => e.userName === user.userName);
        socket.peerId = user.id;
        if (isExist) {
            return socket.emit('DANG_KY_THAT_BAI');
        }
        arrUserInfo.push(user);
        socket.emit('DANH_SACH_ONLINE', arrUserInfo)
        socket.broadcast.emit('CO_NGUOI_DUNG_MOI', user)
    })

    socket.on('disconnect', () => {
        const index = arrUserInfo.findIndex(user => user.id === socket.peerId);
        arrUserInfo.splice(index, 1);
        io.emit('AI_DO_NGAT_KET_NOI', socket.peerId)
    })
});
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');

const { startup } = require('./startup');


app.set('view engine', 'ejs');
app.use('/', (express.static(path.join(__dirname, './publics'))))
app.use('/views', (express.static(path.join(__dirname, './views'))))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(session({
    secret: 'thaytoancovua',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


global.loggedIn = null;
global.userName = null;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new GoogleStrategy({
    clientID: "868039850591-03lacnopn176nvdjh4p1hkatls39rsl3.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://mythuatnamthang.com/google/login",
    scope: ['profile', 'email']
},
    async function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

passport.use(new FacebookStrategy({
    clientID: '1739249023099944',
    clientSecret: '1b9c5f1944537fe7e396499970fc989f',
    callbackURL: "https://mythuatnamthang.com/facebook/loged",
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        return cb(null, profile)
    }
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});
startup(app);

server.listen(process.env.PORT, () => {
    console.log('http://localhost:3000/');
});