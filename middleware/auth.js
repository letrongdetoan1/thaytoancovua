const {User} = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.checkRole = async (req, res, next)=>{
    try{
        if(req.user.role === 'admin'){
            next();
        }else{
            res.status(403).json({message: 'role is not allowed'})
        }
    }catch(err){
        console.log(err)
    }
}


async function checkToken(req, res, next) {
    let searchTokenUser
    try {
        let token = req.headers.authorization
        searchTokenUser = await User.findOne(
            { token: token }
        )
        if (searchTokenUser) {
            let id = jwt.verify(token, 'check')
            if (id) {
                delete searchTokenUser._doc.token
                delete searchTokenUser._doc.password
                req.user = searchTokenUser
                next()
            }
        } else {
            res.json('cant not find user')

        }
    } catch (error) {
        if (error.message == 'jwt expired') {
            res.json({ message: 'jwt expired' })
        } else {
            res.json(error)
        }
    }
}


module.exports = { checkToken }